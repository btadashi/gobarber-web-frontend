import React from 'react';

import { Container } from './styles';

/** Para passarmos ao 'Tooltip' que ele poderá receber uma estilização de um elemento superior,temos que permitir que ele
 * recebe um 'className', que seria uma espécie de classe no React. Passamo um '?' para que ela não seja uma classe obrigatória.
 */
interface TooltipProps {
  title: string;
  className?: string;
}

/** Passamos a 'className' dentro do componente, passando um valor vazio  */
const Tooltip: React.FC<TooltipProps> = ({
  title,
  className = '',
  children,
}) => {
  return (
    /** Em seguida, passamos a 'className' para dentro do Container */
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
