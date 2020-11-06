/** Impportammos o 'ValidationError' de dentro de 'yup' para que possamos tipar o objeto err */
import { ValidationError } from 'yup';

/** [key: string]: Dizemos que a "chave" vai ser uma string. Em outras palavras, a parte do lado direito do objeto (key) pode ser qualquer
 * coisa e a do outro lado (propriedade) também qualquer coisa, desde que seja uma string.
 */
interface Errors {
  [key: string]: string;
}

/** getValidationErros será uma função que recebe o objeto de erro e vai retornar o objeto de erros em outro formato  */
/** Depois, podemos dizer que a função vai retornar 'Errors' */
export default function getValidationErros(err: ValidationError): Errors {
  /** Criamos uma variável 'validationErrors', do tipo 'Errors' , iniciando com objeto vazio */
  const validationErrors: Errors = {};

  /** Percorremos cada erro de dentro de inner com foreach(). Daí, para cada um dos erros, pegamos o 'validationErrors' e assim
   * criamos uma propriedade dela com o nome 'path' e seu valor será a 'message'
   */
  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
