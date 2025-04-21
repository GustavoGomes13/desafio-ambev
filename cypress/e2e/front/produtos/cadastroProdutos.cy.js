import { produtos } from "../../../fixtures/produtoTeste";
import { seletoresProdutos } from "../../../fixtures/seletoresProdutos";
import { usuarios } from "../../../fixtures/usuariosTeste";

let idUsuario
describe('Cadastro de produtos', () => {
    let idProduto

    before(() => {
        cy.criarUsuario(usuarios.usuario1).then((id) => {
            idUsuario = id
        });
        cy.autenticar(usuarios.usuario1);
        cy.acessarCadProdutos();
    });

    after(() => {
        return cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/produtos?nome=${encodeURIComponent(produtos.produto1.nome)}`
        }).then((response) => {
            const idProduto = response.body.produtos[0]._id;
    
            return cy.apagarProduto(idProduto);
        }).then(() => {
            return cy.apagarUsuario(idUsuario);
        });
    });

    it('Deve cadastrar um produto', () => {
        cy.get(seletoresProdutos.cadProdutos.campoNome, {timeout: 5000 }).should('be.visible');
        cy.get(seletoresProdutos.cadProdutos.campoNome).type(produtos.produto1.nome);
        cy.get(seletoresProdutos.cadProdutos.campoPreco).type(produtos.produto1.preco);
        cy.get(seletoresProdutos.cadProdutos.campoDescricao).type(produtos.produto1.descricao);
        cy.get(seletoresProdutos.cadProdutos.campoQtd).type(produtos.produto1.quantidade);
        cy.get(seletoresProdutos.cadProdutos.campoImagem).selectFile('cypress/fixtures/images/companion_cube.png');
        cy.get(seletoresProdutos.cadProdutos.btnCadastrar).click();

        cy.url().should('include', '/listarprodutos');
        cy.contains('Lista dos Produtos').should('be.visible');
        cy.get(seletoresProdutos.listaProdutos.tabelaProdutos).should('be.visible');
        cy.get('tbody tr td').contains(produtos.produto1.nome).should('be.visible');
    });
});

describe('Não deve cadastrar produtos', () => {
    let idProduto
    before(() => {
        cy.criarUsuario(usuarios.usuario1).then((id) => {
            idUsuario = id
        });
        cy.criarProduto().then((id) => {
            idProduto = id
        });
    });
    
    beforeEach(() => {
        cy.autenticar(usuarios.usuario1);
        cy.acessarCadProdutos();
    })

    after(() => {
        cy.apagarProduto(idProduto);
        cy.apagarUsuario(idUsuario);
    });

    it('Não deve cadastrar um produto vazio', () => {
        cy.get(seletoresProdutos.cadProdutos.btnCadastrar).click();

        const msgErro = [
            'Nome é obrigatório',
            'Preço é obrigatório',
            'Descrição é obrigatório',
            'Quantidade é obrigatório',
            'Imagem é obrigatório'
          ];
          
          cy.get('.alert').should('have.length', msgErro.length).each(($alert, index) => {
            cy.wrap($alert)
              .should('have.css', 'background-color', 'rgb(243, 150, 154)');
            
            cy.wrap($alert)
              .find('span')
              .should('have.text', msgErro[index]);
          });
    });

    it('Não deve cadastrar produto com o mesmo nome', () => {
        cy.get(seletoresProdutos.cadProdutos.campoNome).type(produtos.produto1.nome);
        cy.get(seletoresProdutos.cadProdutos.campoPreco).type(5);
        cy.get(seletoresProdutos.cadProdutos.campoDescricao).type('Produto duplicado');
        cy.get(seletoresProdutos.cadProdutos.campoQtd).type(3);
        cy.get(seletoresProdutos.cadProdutos.campoImagem).selectFile('cypress/fixtures/images/companion_cube.png');
        cy.get(seletoresProdutos.cadProdutos.btnCadastrar).click();

        cy.get('.alert').should('have.css', 'background-color', 'rgb(243, 150, 154)');
        cy.get('.alert > span').should('have.text', 'Já existe produto com esse nome');
    });
});