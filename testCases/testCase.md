## Front
### Login
**Dado** que o usuário não esteja autenticado
**Quando** preencher os dados de um usuário válido
**Então** deve ser direcionado a home

**Dado** que o usuário não esteja autenticado
**Quando** deixar o campo e-mail em branco
**E** o usuário deixa o campo senha em branco
**E** o usuário clicar em "Entrar"
**Então** deve exibir mensagens que o e-mail e a senha não pode ficar em branco

**Dado** que o usuário não esteja autenticado
**Quando** preencer o e-mail com um e-mail inexistente
**E** Preencher com uma senha correta
**E** o usuário clicar em "Entrar"
**Então** deve exibir mensagens de e-mail/senha inválidos

**Dado** que o usuário não esteja autenticado
**Quando** preencer o e-mail com um e-mail válido
**E** Preencher com uma senha incorreta
**E** o usuário clicar em "Entrar"
**Então** deve exibir mensagens de e-mail/senha inválidos

---

### Cadastro de produtos
**Dado** que o usuário esteja autenticado
**E** que o usuário esteja na tela de cadastro de produtos
**Quando** usuário preencher os campos obrigatórios
**E** o usuário clicar em cadastrar
**Então** deve cadastrar um novo produto
**E** deve exibir o produto na lista de produtos

**Dado** que o usuário esteja autenticado
**E** que o usuário esteja na tela de cadastro de produtos
**Quando** usuário não preencher nenhum campo
**E** usuário clicar em cadastrar
**Então** deve exibir mensagens que os campos são obrigatórios

**Dado** que o usuário esteja autenticado
**E** usuário já tem produto cadastrado
**E** quando o usuário esteja na tela de cadastro de produtos
**Quando** usuário tentar cadastrar produto com nome existente
**Então** deve exibir mensagem informando que já existe produto com o nome

---

### Store
**Dado** que o usuário esteja autenticado com usuário não administrador
**Quando** clicar no icone do carrinho
**Então** deve ser direcionado para lista de compras

**Dado** que o usuário esteja autenticado com usuário não administrador
**E** que tenha produto cadastrado
**Quando** o usuário pesquisa o produto
**Então** deve ser exibido o produto com o termo pesquisado
**E** deve exibir informações do produto (Imagem, nome, preço, botões)

**Dado** que o usuário esteja autenticado com usuário não administrador
**E** que tenha produto cadastrado
**E** o usuário tenha feito uma pesquisa
**Quando** o usuário apagar o termo pesquisado
**E** o usuário pesquisar sem nenhum termo
**Então** deve voltar a exibir todos os produtos

**Dado** que o usuário esteja autenticado com usuário não administrador
**E** que tenha produto cadastrado
**Quando** o usuário pesquisar o produto
**E** o usuário clicar em "Detalhes"
**Então** deve ser direcionado a tela do produto
**E** deve exibir todas as informações do produto

**Dado** que o usuário esteja autenticado com usuário não administrador
**E** que tenha produto cadastrado
**Quando** o usuário clicar em "Adicionar a lista"
**Então** deve ser direcionado a tela de lista de compras
**E** o produto adicionado deve ser exibido

## API
### Login
**Dado** que o usuário não esteja autenticado
**Quando** preencher os dados de um email válido
**E** preencher os dados de uma senha válida
**Então** deve ser retornado status code 200
**E** deve exibir mensagem de login com sucesso

**Dado** que o usuário não esteja autenticado
**Quando** preencher os dados de um email inválido
**E** preencher os dados de uma senha válida
**Então** deve ser retornado status code 400
**E** deve exibir mensagem de usuário inválido

**Dado** que o usuário não esteja autenticado
**E** usuário não adicionar propriedade "email" ao body
**E** usuário não adicionar propriedade "password" ao body
**Quando** usuário enviar POST de login
**Então** deve retornar status 400
**E** deve retornar mensagem que "email" é obrigatório
**E** deve retornar mensagem que "password" é obrigatório

**Dado** que o usuário não esteja autenticado
**E** usuário não informar valor de "email" ao body
**E** usuário não informar valor de "password" ao body
**Quando** usuário enviar POST de login
**Então** deve retornar status 400
**E** deve retornar mensagem que "email" não pode ficar em branco
**E** deve retornar mensagem que "password" não pode ficar em branco

**Dado** que o usuário não esteja autenticado
**E** usuário não informar null no "email" do body
**E** usuário não informar null no "password" do body
**Quando** usuário enviar POST de login
**Então** deve retornar status 400
**E** deve retornar mensagem que "email" deve ser uma string
**E** deve retornar mensagem que "password" deve ser uma string

**Dado** que o usuário não esteja autenticado
**E** usuário não preencher o body
**Quando** usuário enviar POST de login
**Então** deve retornar status 400
**E** deve retornar mensagem que "email" é obrigatório
**E** deve retornar mensagem que "password" é obrigatório

**Dado** que o usuário não esteja autenticado
**E** usuário preencher o body com uma propriedade não esperada
**Quando** usuário enviar POST de login
**Então** deve retornar status 400
**E** deve retornar mensagem que a propriedade não é permitida

---

### Usuários
**Dado** que tenha um usuário cadastrado
**Quando** usuário enviar GET de usuários sem parâmetros
**Então** deve retornar status 200
**E** deve retornar lista de usuários cadastrados

**Dado** que tenha um usuário cadastrado
**Quando** usuário enviar GET de usuários com parâmetro "ID" válido
**Então** deve retornar status 200
**E** deve retornar apenas usuário com o ID correto

**Dado** que tenha um usuário cadastrado
**Quando** usuário enviar GET de usuários com parâmetro "nome" válido
**Então** deve retornar status 200
**E** deve retornar apenas usuários que contenham o parâmetro buscado no nome

**Dado** que tenha um usuário cadastrado
**Quando** usuário enviar GET de usuários com parâmetro "email" válido
**Então** deve retornar status 200
**E** deve retornar apenas usuários que contenham o valor do parâmetro buscado no e-mail

**Dado** que tenha um usuário cadastrado
**Quando** usuário enviar GET de usuários com parâmetro "password" válido
**Então** deve retornar status 200
**E** deve retornar apenas usuários que contenham o valor do parâmetro buscado no "password"

**Dado** que tenha um usuário cadastrado
**Quando** usuário enviar GET de usuários com parâmetro "administrador" true
**Então** deve retornar status 200
**E** deve retornar apenas usuários que são administradores

**Dado** que tenha um usuário cadastrado
**Quando** usuário enviar GET de usuários com parâmetro "administrador" false
**Então** deve retornar status 200
**E** deve retornar apenas usuários que não são administradores

**Dado** que tenha um usuário cadastrado
**Quando** usuário enviar GET de usuários/ID com parâmetro "ID" inválido
**Então** deve retornar status 400
**E** deve retornar mensagem que id deve ser válido

**Dado** que tenha um usuário cadastrado
**Quando** usuário enviar GET de usuários/ID com parâmetro "ID" inexistente
**Então** deve retornar status 400
**E** deve retornar mensagem de usuário não encontrado

**Dado** que tenha um usuário cadastrado
**Quando** usuário enviar GET de /usuários com parâmetro "ID" inválido
**Então** deve retornar status 200
**E** deve retornar lista zerada

**Dado** que tenha um usuário cadastrado
**Quando** usuário enviar GET de usuários com parâmetro "nome" inexistente
**Então** deve retornar status 200
**E** deve retornar lista de usuários zerada

**Dado** que tenha um usuário cadastrado
**Quando** usuário enviar GET de usuários com parâmetro "email" inexistente
**Então** deve retornar status 200
**E** deve retornar lista de usuários zerada

**Dado** que tenha um usuário cadastrado
**Quando** usuário enviar GET de usuários com parâmetro "email" inválido
**Então** deve retornar status 400
**E** deve retornar mensagem de email inválido

**Dado** que tenha um usuário cadastrado
**Quando** usuário enviar GET de usuários com parâmetro "password" inexistente
**Então** deve retornar status 200
**E** deve retornar lista de usuários zerada

**Dado** que tenha um usuário cadastrado
**Quando** usuário enviar GET de usuários com parâmetro "administrador" que não seja booleano
**Então** deve retornar status 400
**E** deve retornar mensagem que "amdministrador" deve ser booleano 

**Dado** que tenha mais de um usuário cadastrado
**Quando** usuário preencher dois parâmetros com usuários diferentes
**Então** deve retornar status 200
**E** deve retornar lista de usuários zerada

---

## Edição de usuários
**Dado** que o usuário tenha um cadastro
**Quando** o usuário enviar a requisição PUT editando o usuário cadastrado
**Então** deve retornar status code 200
**E** deve retornar mensagem de sucesso
**E** ao consultar o usuário deve exibir dados atualizados

**Dado** que o usuário tenha um cadastro
**Quando** o usuario enviar a requisição PUT com um ID inexistente
**Então** deve cadastrar um novo usuário
**E** deve retornar status code 201
**E** deve retornar ID e mensage de cadastro com sucesso

**Dado** que o usuario 2 tenha um cadastros
**Quando** o usuário enviar a requisição PUT editando o e-mail para outro e-mail já utilizado existente
**Então** deve retornar status 400
**E** deve retornar mensagem que o e-mail já está cadastrado

**Dado** que o usuário tenha um cadastro
**Quando** o usuario enviar a requisição PUT com o body vazio
**Então** deve retornar status code 400
**E** deve retornar mensagem com todos os campos obrigatórios

**Dado** que o usuário tenha um cadastro
**Quando** o usuario enviar a requisição PUT com propriedades com o tipo inválido
**Então** deve retornar status code 400
**E** deve retornar mensagem informando o tipo do campo

**Dado** que o usuário tenha um cadastro
**Quando** o usuário enviar um requisição PUT com propriedades inesperadas
**Então** deve retornar status code 400
**E** deve retornar mensagem informando que a propriedade não é permitida

**Dado** que o usuário tenha um cadastro
**Quadno** o usuario enviar a requisição PUT com propriedades em branco
**Então** deve retornar status code 400
**E** deve retornar mensagem informando que as propriedades não podem ficar em branco