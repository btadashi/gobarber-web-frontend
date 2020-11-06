/** Importamos o 'React' de dentro de 'react' */
import React from 'react';

/** Fazemos a importação dos nossos 'providers' */
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

/** Criamos um componente chamado 'AppProvider', que vai ser como se fosse um "provider global", que irá englobar
 * todos os nossos 'providers'
 */
const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
