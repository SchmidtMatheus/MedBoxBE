# Projeto Medbox

Este é um projeto Nest.js que inclui a configuração básica de um backend com Nest.js, TypeORM e PostgreSQL.

## Configuração

1. Instale as dependências do projeto:

npm install


2. Crie um arquivo `.env` na raiz do projeto e adicione as informações de conexão com o banco de dados:

DB_TYPE=postgres
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco


Substitua `seu_usuario`, `sua_senha` e `nome_do_banco` pelos valores correspondentes do seu ambiente de desenvolvimento.

3. Execute o servidor:

npm start


## Endpoints

### Registries

- `POST /registries`: Cria um novo registro.
- `GET /registries`: Retorna todos os registros.
- `GET /registries/:id`: Retorna um registro pelo ID.
- `GET /registries/:startDate/:endDate`: Retorna registros dentro de um intervalo de datas.
- `DELETE /registries/:id`: Remove um registro pelo ID.

### Configs

- `POST /configs`: Cria uma nova configuração.
- `GET /configs`: Retorna todas as configurações.
- `GET /configs/:id`: Retorna uma configuração pelo ID.
- `PATCH /configs/:id`: Atualiza uma configuração pelo ID.
- `DELETE /configs/:id`: Remove uma configuração pelo ID.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

