import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

/** Dizemos que além de receber todas as propriedades de um 'button' tradicional e passa
 * a receber um loading, opcional (?) do tipo 'boolean' */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

/** Recuperamos o 'loading' e   */
const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {/** Se estivermos com o 'loading', mostraremos a palavra carregando, senão me mostra o 'children'
     * que é o texto de dentro do botão mesmo */}
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;
