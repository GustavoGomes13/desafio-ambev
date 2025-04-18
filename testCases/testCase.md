## Front
**Dado** que o usuário não esteja autenticado
**Quando** preencher os dados de um usuário válido
**Então** deve ser direcionado a home

**Dado** que o usuário não esteja autenticado
**Quando** preencher os dados de um usuário/senha inválido
**Então** deve exibir mensagem de usuário/senha inválido

**Dado** que o usuário esteja autenticado
**E** que tenha um usuário cadastrado
**E** que o usuário esteja na tela de de lista de usuário
**Quando** usuário clicar em editar de um usuário
**Então** deve ser direcionado para tela de edição
**E** deve permitir que o usuário altere os dados do usuário

**Dado** que o usuário esteja autenticado
**E** que o usuário esteja na tela de cadastro de produtos
**Quando** usuário preencher os campos obrigatórios
**E** o usuário clicar em cadastrar
**Então** deve cadastrar um novo produto
**E** deve exibir o produto na lista de produtos

---

## API
### Login
**Dado** que o usuário não esteja autenticado
**Quando** preencher os dados de um usuário válido
**Então** deve ser retornado status code 200
**E** deve exibir mensagem de login com sucesso

**Dado** que o usuário não esteja autenticado
**Quando** preencher os dados de um usuário/senha inválido
**Então** deve ser retornado status code 401
**E** deve exibir mensagem de usuário/senha inválido

**Dado** que o usuário não esteja autenticado
**E** usuário não adicionar propriedade "email" ao body
**Quando** usuário enviar POST de login
**Então** deve retornar status 400
**E** deve retornar mensagem que "email" é obrigatório

**Dado** que o usuário não esteja autenticado
**E** usuário não adicionar propriedade "password" ao body
**Quando** usuário enviar POST de login
**Então** deve retornar status 400
**E** deve retornar mensagem que "password" é obrigatório

**Dado** que o usuário não esteja autenticado
**E** usuário não informar valor de "email" ao body
**Quando** usuário enviar POST de login
**Então** deve retornar status 400
**E** deve retornar mensagem que "email" não pode ficar em branco

**Dado** que o usuário não esteja autenticado
**E** usuário não informar valor de "password" ao body
**Quando** usuário enviar POST de login
**Então** deve retornar status 400
**E** deve retornar mensagem que "password" não pode ficar em branco

**Dado** que o usuário não esteja autenticado
**E** usuário não informar null no "email" do body
**Quando** usuário enviar POST de login
**Então** deve retornar status 400
**E** deve retornar mensagem que "email" deve ser uma string

**Dado** que o usuário não esteja autenticado
**E** usuário não informar null no "password" do body
**Quando** usuário enviar POST de login
**Então** deve retornar status 400
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

### 
**Dado** que o usuário esteja autenticado
**E** exista um usuário já cadastrado
**Quando** o usuário enviar a requisição PUT editando o usuário cadastrado
**Então** deve retornar status code 200
**E** deve retornar mensagem de sucesso
**E** ao consultar o usuário deve exibir dados atualizados