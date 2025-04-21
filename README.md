# 🧪 Desafio AmbevTech - Cypress

Este projeto utiliza o framework **Cypress** para realizar testes automatizados end-to-end e teste de API.
Os cenários de API criados são:
- Login
- Consulta de usuários
- Editar usuários

Já os cenários de e2e:
- Login
- Cadastro de produtos
- Loja

---

## 🚀 Requisitos

- **Node.js** (versão LTS recomendada)
- **npm** ou **yarn**
- Cypress instalado no projeto:

```bash
npm install cypress --save-dev
```

---

## 💻 Configuração Inicial

1. Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/GustavoGomes13/desafio-ambev.git
```

2. Instale as dependências:

```bash
npm install
```

---

## 🚧 Executando os testes

### Modo Headless (sem interface)

```bash
npx cypress run
```

### Modo Interativo (com interface)

```bash
npx cypress open
```
Escolha a spec que deseja rodar no menu da interface.

---

## 🖊️ Comentários sobre os testes

- Os testes foram construídos como o uso hipotético de um teste de regressão:
  - Fluxo de login validado com e2e por API
  - Os cenários não foram escolhidos para que fosse complementares, mas que pudessem apresentar maiores diferenças na criação dos 
  
- Caso de teste com erro:
  - O caso de teste `Não deve cadastrar um produto vazio` do cenário `Não deve cadastrar produtos` irá apresentar erro durante o teste
    - Padrão da própria tela define o campo imagem como obrigatório
    - Não há mensagem informando que a imagem é obrigatório
    - Erros de gramática apresentados ao usuário

- Casos verificados mas não cobertos pela automação:
  - Limite de caracteres dos campos
    - Não automatizados devido a falta de documentação das limitações
  - Edições pelo front
    - No momento de criação do projeto, nenhuma edição estava funcionando através do front

- **Estratégia usada:**
  - Hooks `before` e `after` para preparar e limpar ambiente.
  - Massa de dados externa via `fixtures`.
  - Uso de `data-testid` para seletores estáveis.
  
---

## 🛡️ Boas Práticas

- Testes independentes (Um teste caso de teste não deve impactar em outro caso de teste).
- Utilização das `fixtures` e `custom commands` do Cypress.

---

