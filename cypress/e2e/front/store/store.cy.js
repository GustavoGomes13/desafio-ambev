import { produtos } from "../../../fixtures/produtoTeste";
import { seletoresStore } from "../../../fixtures/seletoresStore";
import { usuarios } from "../../../fixtures/usuariosTeste";

describe('Produtos na loja', () => {
    let usuario
    let cliente
    let idProduto

    before(() => {
        return cy.criarUsuario(usuarios.usuario1).then((id) => {
            usuario = id;
            return cy.criarUsuario(usuarios.usuario2);
        }).then((id) => {
            cliente = id;
            console.log('cliente criado com id ' + cliente)
            return cy.criarProduto();
        }).then((id) => {
            idProduto = id
            console.log('Produto criado com id ' + idProduto)
            
        });
    });

    beforeEach(() => {
        return cy.autenticar(usuarios.usuario2);
    })

    after(() => {
        cy.apagarProduto(idProduto);
        cy.apagarUsuario(usuario);
        cy.apagarUsuario(cliente);
    });

    it('Deve acessar lista de compras', () => {
        cy.get('[data-testid="shopping-cart-button"]').click();
        cy.get('.jumbotron > h1').should('be.visible');
        cy.get('.jumbotron > h1').should('have.text', 'Lista de Compras');
        cy.get('[data-testid="shopping-cart-empty-message"]').should('have.text', 'Seu carrinho está vazio')
    })

    it('Deve pesquisar um produto', () => {
        cy.get(seletoresStore.barraPesquisa).should('be.visible');
        cy.get(seletoresStore.barraPesquisa).type(produtos.produto1.nome);
        cy.get(seletoresStore.btnPesquisar).click();
        cy.get('section > div').should('have.lengthOf', 1);
        cy.get('[data-testid="product-detail-link"] > img').should('be.visible');
        cy.get('.card-body > h5').should('have.text', produtos.produto1.nome);
        cy.get('.card-body > h6:nth-child(5)').should('have.text', `$ ${produtos.produto1.preco}`);
        cy.get('.card-body > div > a:nth-child(1)').should('be.visible');
        cy.get('.card-body > div > a:nth-child(1)').should('have.prop', 'href');
        cy.get('.card-body > div > a:nth-child(3)').should('be.visible');
        cy.get('.card-body > div > a:nth-child(3)').should('have.prop', 'href');
    });

    it('Deve limpar a pesquisa', () => {
        cy.pesquisarProduto(produtos.produto1.nome);

        cy.get(seletoresStore.barraPesquisa).clear();
        cy.get(seletoresStore.barraPesquisa).should('not.have.text');
        cy.get(seletoresStore.btnPesquisar).click();

        cy.get('section > div').should('have.length.greaterThan', 1);
        cy.get('.card-body > h5').should('contain', produtos.produto1.nome);
    });

    it('Deve abrir detalhes do produto', () => {
        cy.pesquisarProduto(produtos.produto1.nome);

        cy.get('.card-body > div > a:nth-child(1)').click();
        cy.get('.jumbotron > h1').should('be.visible');
        cy.get('.jumbotron > h1').should('have.text', 'Detalhes do produto');

        cy.get('[data-testid="product-detail-name"]').should('be.visible');
        cy.get('[data-testid="product-detail-name"]').should('have.text', produtos.produto1.nome);

        cy.get('.row > div > img').should('be.visible');
        cy.get('.especificacoes > h4:nth-child(2)').should('be.visible');
        cy.get('.especificacoes > h4:nth-child(3)').should('be.visible');
        cy.get('.especificacoes > h4:nth-child(4)').should('be.visible');
        cy.get('.especificacoes > h4:nth-child(2)').should('have.text', `R$: ${produtos.produto1.preco}`);
        cy.get('.especificacoes > h4:nth-child(3)').should('have.text', `Quantidade: ${produtos.produto1.quantidade}`);
        cy.get('.especificacoes > h4:nth-child(4)').should('have.text', `Descrição: ${produtos.produto1.descricao}`);

        cy.get('[data-testid="product-detail-link"]').should('be.visible');
        cy.get('[data-testid="product-detail-link"]').should('have.prop', 'href');
        cy.get('[data-testid="voltarHome"]').should('be.visible');
    });

    it('Deve adicionar produto na lista', () => {
        cy.pesquisarProduto(produtos.produto1.nome);
        cy.get('[data-testid="adicionarNaLista"]').click();

        cy.get('[data-testid="paginaInicial"]').should('be.visible');

        cy.get('.jumbotron > h1').should('be.visible');
        cy.get('.jumbotron > h1').should('have.text', 'Lista de Compras');

        cy.get('[data-testid="adicionar carrinho"]').should('be.visible');
        cy.get('[data-testid="limparLista"]').should('be.visible');

        cy.get('[data-testid="shopping-cart-product-name"]').should('have.text', `Produto:${produtos.produto1.nome}`);
        cy.get('.card-body > div > p').should('have.text', `Preço R$${produtos.produto1.preco}`);
        cy.get('[data-testid="shopping-cart-product-quantity"] > p').should('have.text', 'Total: 1');
    });
});