import { produtos } from "../../../fixtures/produtoTeste";
import { seletoresProdutos } from "../../../fixtures/seletoresProdutos";

describe('Cadastro de produtos', () => {
    before(() => {
        cy.criarUsuario();
        cy.autenticar();
        cy.acessarCadProdutos();
    });

    after(() => {
        cy.apagarProduto();
        cy.apagarUsuario();
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
        cy.get('.table > tbody > tr > td:nth-child(1):has-text("Companion Cube")').should('be.visible');
    });

    // it('Não deve cadastrar um produto', () => {
        
    // })
});