import { produtos } from "../fixtures/produtoTeste";
import { seletoresFormLogin } from "../fixtures/seletoresLogin";
import { usuarios } from "../fixtures/usuariosTeste";
import { seletoresStore } from "../fixtures/seletoresStore";

Cypress.Commands.add('criarUsuario', (usuario) => {
    return cy.request({
        method: 'GET',
        url: `${Cypress.env('url')}/usuarios?nome=${encodeURIComponent(usuario.nome)}`,
        failOnStatusCode: false
    }).then((response) => {
        if (response.body.quantidade > 0) {
            const idUsuarioExistente = response.body.usuarios[0]._id;
            return cy.wrap(idUsuarioExistente);
        } else {
            return cy.request('POST', `${Cypress.env('url')}/usuarios`, {
                nome: usuario.nome,
                email: usuario.email,
                password: usuario.password,
                administrador: `${usuario.admUsuario}`
            }).then((response) => {
                const idUsuario = response.body._id;
                return cy.wrap(idUsuario);
            });
        }
    });
});


Cypress.Commands.add('apagarUsuario', (idUsuario) => {
    cy.request('DELETE', `${Cypress.env('url')}/usuarios/${idUsuario}`);
});

Cypress.Commands.add('autenticar', (usuario) => {
    cy.visit('/login');
    cy.get(seletoresFormLogin.campoEmail).type(usuario.email);
    cy.get(seletoresFormLogin.campoSenha).type(usuario.password);
    cy.get(seletoresFormLogin.btnEntrar).click();
});

Cypress.Commands.add('acessarCadProdutos', () => {
    cy.get('[data-testid="cadastrar-produtos"]').click();
});

Cypress.Commands.add('criarProduto', () => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('url')}/login`,
        body: {
            email: usuarios.usuario1.email,
            password: usuarios.usuario1.password
        }
    }).then((response) => {
        const authToken = response.body.authorization;

        return cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/produtos?nome=${encodeURIComponent(produtos.produto1.nome)}`,
            failOnStatusCode: false
        }).then((response) => {
            if (response.body.quantidade > 0) {
                const idProdutoExistente = response.body.produtos[0]._id;
                return cy.wrap(idProdutoExistente);
            } else {
                return cy.request({
                    method: 'POST',
                    url: `${Cypress.env('url')}/produtos`,
                    headers: {
                        Authorization: `${authToken}`
                    },
                    body: {
                        nome: produtos.produto1.nome,
                        preco: produtos.produto1.preco,
                        descricao: produtos.produto1.descricao,
                        quantidade: produtos.produto1.quantidade
                    }
                }).then((response) => {
                    const idProduto = response.body._id;
                    return cy.wrap(idProduto);
                });
            }
        });
    });
});


Cypress.Commands.add('apagarProduto', (idProduto) => {
    console.log(idProduto)
    cy.request({
        method: 'POST',
        url: `${Cypress.env('url')}/login`,
        body: {
            email: usuarios.usuario1.email,
            password: usuarios.usuario1.password
        }
    }).then((response) => {
        const authToken = response.body.authorization;
        return cy.request({
            method: 'DELETE', 
            url: `${Cypress.env('url')}/produtos/${idProduto}`,
            headers: {
                Authorization: `${authToken}`
            }
        }); 
    })
});

Cypress.Commands.add('pesquisarProduto', (nomeProduto) => {
    cy.get(seletoresStore.barraPesquisa).type(nomeProduto);
    cy.get(seletoresStore.btnPesquisar).click();
})