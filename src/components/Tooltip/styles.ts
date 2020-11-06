import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    /**Descomentamos o 'opacity' e 'transition' */
    opacity: 0;
    transition: opacity 0.4s;
    /**visibility: hidden -> Esconde o elemento de nosso dom enquanto ele não estiver disponível para ser visto */
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translate(-50%);

    color: #312e38;

    &::before {
      content: '';
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
    }
  }

  /**Acrescentamos o hover, quando o usuário passar o mouse por cima do nosso span */
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
