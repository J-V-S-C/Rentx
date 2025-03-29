import path from 'path';

export function getSwaggerPath(): string {
  return path.resolve(process.cwd(), 'src', 'swagger.json');
}
//process.cwd() sempre aponta pra raiz do projeto — não importa onde o arquivo esteja sendo chamado.
