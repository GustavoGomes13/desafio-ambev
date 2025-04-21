import { produtos } from "../fixtures/produtoTeste";
import { seletoresFormLogin } from "../fixtures/seletoresLogin";
import { usuarios } from "../fixtures/usuariosTeste";

Cypress.Commands.add('criarUsuario', () => {
    cy.request('POST', `${Cypress.env('url')}/usuarios`, {
        nome: usuarios.usuario1.nome,
        email: usuarios.usuario1.email,
        password: usuarios.usuario1.password,
        administrador: `${usuarios.usuario1.admUsuario}`
    });

    return cy.request('GET', `${Cypress.env('url')}/usuarios?nome=${encodeURIComponent(usuarios.usuario1.nome)}`).then((response) => {
        const idUsuario = response.body.usuarios[0]._id
        return cy.wrap(idUsuario);
    });
});

Cypress.Commands.add('apagarUsuario', (idUsuario) => {
    cy.request('DELETE', `${Cypress.env('url')}/usuarios/${idUsuario}`);
});

Cypress.Commands.add('autenticar', () => {
    cy.visit(`${Cypress.env('baseURL')}/login`);
    cy.get(seletoresFormLogin.campoEmail).type(usuarios.usuario1.email);
    cy.get(seletoresFormLogin.campoSenha).type(usuarios.usuario1.password);
    cy.get(seletoresFormLogin.btnEntrar).click();
});

Cypress.Commands.add('acessarCadProdutos', () => {
    cy.get('[data-testid="cadastrar-produtos"]').click();
});

Cypress.Commands.add('apagarProduto', () => {
    cy.window().then((win) => {
        const token = win.localStorage.getItem('serverest/userToken');
        cy.request('GET', `${Cypress.env('url')}/produtos?nome=${encodeURIComponent(produtos.produto1.nome)}`).then((response) => {
            const idProduto = response.body.produtos[0]._id
            cy.request({
                method: 'DELETE',
                url: `${Cypress.env('url')}/produtos/${idProduto}`,
                headers: {
                    Authorization: `${token}`
                }
            });
        });
    });
});