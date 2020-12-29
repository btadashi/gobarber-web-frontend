import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { AuthProvider, useAuth } from '../../hooks/auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: 'user-123',
        name: 'John Doe',
        email: 'johndoe@example.com',
      },
      token: 'token-123',
    };

    apiMock.onPost('sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'johndoe@example.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@Gobarber:token',
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@Gobarber:user',
      JSON.stringify(apiResponse.user),
    );

    expect(result.current.user.email).toEqual('johndoe@example.com');
  });

  it('should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@Gobarber:token':
          return 'token-123';
        case '@Gobarber:user':
          return JSON.stringify({
            id: 'user-123',
            name: 'John Doe',
            email: 'johndoe@example.com',
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('johndoe@example.com');
  });

  it('should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@Gobarber:token':
          return 'token-123';
        case '@Gobarber:user':
          return JSON.stringify({
            id: 'user-123',
            name: 'John Doe',
            email: 'johndoe@example.com',
          });
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  /** Deve ser possível atualizar os dados de um usuário */
  it('should be able to update user data', async () => {
    /** Observamos através do 'spyOn' se a função  'setItem' foi chamada lá dentro de 'Storage.prototype' */
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    /** Chamamos o nosso 'hook', disparando o 'result' de dentro de 'renderHook' */
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    /** Criamos um objeto de usuário */
    const user = {
      id: 'user-123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      avatar_url: 'image-test.jpg',
    };

    /** Usamos novamente o 'act', pois vamos disparar uma função síncrona e também teremos uma mudança de estado.
     * Disparamos então a nossa função de update, passando dentro dele os dados do uusário (user)
     */
    act(() => {
      result.current.updateUser(user);
    });

    /** Esperamos que 'setItemSpy' tenha sido chamado com os parâmetros da chave '@Gobarber:user', que é a chave que ele
     * armazena no 'Storage' e o conteúdo com as informações do usuário */
    expect(setItemSpy).toHaveBeenCalledWith(
      '@Gobarber:user',
      JSON.stringify(user),
    );

    /** Esperamos que o 'user' de dentro do nosso 'result' seja igual o 'user' que passamos para dentro de nossa função  */
    expect(result.current.user).toEqual(user);
  });
});
