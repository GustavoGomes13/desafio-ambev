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
**Dado** que o usuário não esteja autenticado
**Quando** preencher os dados de um usuário válido
**Então** deve ser retornado status code 200
**E** deve exibir mensagem de login com sucesso

**Dado** que o usuário não esteja autenticado
**Quando** preencher os dados de um usuário/senha inválido
**Então** deve ser retornado status code 401
**E** deve exibir mensagem de usuário/senha inválido

**Dado** que o usuário esteja autenticado
**E** exista um usuário já cadastrado
**Quando** o usuário enviar a requisição PUT editando o usuário cadastrado
**Então** deve retornar status code 200
**E** deve retornar mensagem de sucesso
**E** ao consultar o usuário deve exibir dados atualizados