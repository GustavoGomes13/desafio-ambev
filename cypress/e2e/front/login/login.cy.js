import { usuarios } from "../../../fixtures/usuariosTeste";

const selectorsFormLogin = {
    campoEmail: '#email',
    campoSenha: '#password',
    btnEntrar: '[data-testid="entrar"]'
}

describe('Testes de login', () => {

    let idUsuario
    
    before(() => {
        cy.request('POST', `${Cypress.env('url')}/usuarios`, {
            nome: usuarios.usuario1.nome,
            email: usuarios.usuario1.email,
            password: usuarios.usuario1.password,
            administrador: `${usuarios.usuario1.admUsuario}`
        });

        cy.request('GET', `${Cypress.env('url')}/usuarios?nome=${encodeURIComponent(usuarios.usuario1.nome)}`).then((response) => {
            idUsuario = response.body.usuarios[0]._id
        });
    });

    after(() => {
        cy.request('DELETE', `${Cypress.env('url')}/usuarios/${idUsuario}`);
    });

    beforeEach(() => {
        cy.visit(`${Cypress.env('baseURL')}/login`)
    });

    it('Login com sucesso', () => {
        cy.get(selectorsFormLogin.campoEmail).type(usuarios.usuario1.email)
        cy.get(selectorsFormLogin.campoSenha).type(usuarios.usuario1.password)
        cy.get(selectorsFormLogin.btnEntrar).click()

        cy.url().should('include', '/home')
        cy.contains('Bem Vindo ' + usuarios.usuario1.nome).should('be.visible')
        cy.get('[data-testid="logout"]').should('be.visible')
        cy.get('.row > div').should('be.visible')
    });

    it('Não deve logar com campos em branco', () => {
        cy.get(selectorsFormLogin.btnEntrar).click()

        cy.get('.alert').should('have.length', 2)
        cy.get('.alert:nth-child(3)').should('be.visible')
        cy.get('.alert:nth-child(4)').should('be.visible')
        cy.get('.alert:nth-child(3)').should('have.css', 'background-color', 'rgb(243, 150, 154)')
        cy.get('.alert:nth-child(4)').should('have.css', 'background-color', 'rgb(243, 150, 154)')
        cy.get('.alert:nth-child(3)').invoke('text').then((texto) => {
            const textoSemX = texto.slice(1)
            expect(textoSemX).to.eq('Email é obrigatório')
        });
        cy.get('.alert:nth-child(4)').invoke('text').then((texto) => {
            const textoSemX = texto.slice(1)
            expect(textoSemX).to.eq('Password é obrigatório')
        });
    });

    it('Não deve logar com e-mail incorreto', () => {
        cy.get(selectorsFormLogin.campoEmail).type('gustavoalang13@gmail.com')
        cy.get(selectorsFormLogin.campoSenha).type(usuarios.usuario1.password)
        cy.get(selectorsFormLogin.btnEntrar).click()

        cy.get('.alert > span').should('be.visible')
        cy.get('.alert').should('have.css', 'background-color', 'rgb(243, 150, 154)')
        cy.get('.alert > span').should('have.text', "Email e/ou senha inválidos")
    });

    it('Não deve logar com senha incorreta', () => {
        cy.get(selectorsFormLogin.campoEmail).type(usuarios.usuario1.email)
        cy.get(selectorsFormLogin.campoSenha).type('123')
        cy.get(selectorsFormLogin.btnEntrar).click()

        cy.get('.alert > span').should('be.visible')
        cy.get('.alert').should('have.css', 'background-color', 'rgb(243, 150, 154)')
        cy.get('.alert > span').should('have.text', "Email e/ou senha inválidos")
    });
});