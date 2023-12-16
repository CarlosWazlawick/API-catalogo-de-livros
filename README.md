Catálogo de Livros API
Esta é uma API simples para um catálogo de livros, onde você pode cadastrar, atualizar, excluir, e consultar livros com base em diferentes critérios. Além disso, a API fornece estatísticas sobre os livros, permite adicionar comentários e avaliações, e oferece recomendações.

Rotas
Obter mensagem de boas-vindas

Endpoint: /
Método: GET
Descrição: Retorna uma mensagem indicando que a API está funcionando.
Obter todos os livros

Endpoint: /livros
Método: GET
Descrição: Retorna todos os livros cadastrados no catálogo.
Cadastrar um novo livro

Endpoint: /livros
Método: POST
Descrição: Cadastra um novo livro no catálogo.
Parâmetros do corpo:
titulo (string): Título do livro.
autor (string): Autor do livro.
anoPublicacao (string): Ano de publicação do livro (no formato DD.MM.AAAA).
genero (string): Gênero do livro.
Atualizar um livro existente

Endpoint: /livros/:id
Método: PUT
Descrição: Atualiza as informações de um livro com base no ID fornecido.
Parâmetros de URL:
id (integer): ID do livro a ser atualizado.
Parâmetros do corpo: (pelo menos um dos seguintes)
titulo (string): Novo título do livro.
autor (string): Novo autor do livro.
anoPublicacao (string): Novo ano de publicação do livro (no formato DD.MM.AAAA).
genero (string): Novo gênero do livro.
Excluir um livro

Endpoint: /livros/:id
Método: DELETE
Descrição: Exclui um livro com base no ID fornecido.
Parâmetros de URL:
id (integer): ID do livro a ser excluído.
Filtrar livros por autor

Endpoint: /livros/autor/:autor
Método: GET
Descrição: Retorna livros filtrados pelo autor fornecido.
Parâmetros de URL:
autor (string): Nome do autor.
Filtrar livros por gênero

Endpoint: /livros/genero/:genero
Método: GET
Descrição: Retorna livros filtrados pelo gênero fornecido.
Parâmetros de URL:
genero (string): Gênero do livro.
Pesquisar livros por termo

Endpoint: /livros/pesquisa/:termo
Método: GET
Descrição: Retorna livros cujo título ou autor contenha o termo de pesquisa fornecido.
Parâmetros de URL:
termo (string): Termo de pesquisa.
Ordenar livros

Endpoint: /livros/ordenar/:criterio
Método: GET
Descrição: Retorna livros ordenados com base no critério fornecido.
Parâmetros de URL:
criterio (string): Critério de ordenação (titulo, autor, ano, genero).
Obter estatísticas

Endpoint: /livros/stats
Método: GET
Descrição: Retorna estatísticas sobre os livros cadastrados, incluindo o total de livros, estatísticas por autor, gênero e ano.
Adicionar comentário a um livro

Endpoint: /livros/comentarios/:id
Método: POST
Descrição: Adiciona um comentário a um livro com base no ID fornecido.
Parâmetros de URL:
id (integer): ID do livro.
Parâmetros do corpo:
comentario (string): Comentário a ser adicionado.
Obter comentários de um livro

Endpoint: /livros/comentarios/:id
Método: GET
Descrição: Retorna os comentários de um livro com base no ID fornecido.
Parâmetros de URL:
id (integer): ID do livro.
Adicionar avaliação a um livro

Endpoint: /livros/avaliacoes/:id
Método: POST
Descrição: Adiciona uma avaliação a um livro com base no ID fornecido.
Parâmetros de URL:
id (integer): ID do livro.
Parâmetros do corpo:
avaliacao (float): Avaliação a ser adicionada.
Obter média de avaliações de um livro

Endpoint: /livros/media-avaliacoes/:id
Método: GET
Descrição: Retorna a média das avaliações de um livro com base no ID fornecido.
Parâmetros de URL:
id (integer): ID do livro.
Obter recomendações

Endpoint: /livros/recomendacoes
Método: GET
Descrição: Retorna uma lista de livros recomendados (os primeiros três do catálogo).
Exemplo de Uso (Front-end)
O arquivo HTML fornecido (index.html) inclui um formulário simples para filtrar livros por gênero e exibir os resultados dinamicamente na página.

Instalação
Clone o repositório.
Instale as dependências usando npm install.
Execute o servidor usando node app.js.
Acesse a API em http://localhost:3000.
Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas ou enviar pull requests para melhorar esta API.

Licença
Este projeto é licenciado sob a MIT License.