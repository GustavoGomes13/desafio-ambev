import { usuarios } from "../../../fixtures/usuariosTeste";
import { seletoresFormLogin } from "../../../fixtures/seletoresLogin";

describe('Testes de login', () => {
    let idUsuario
    before(() => {
        cy.criarUsuario().then((id) => {
            idUsuario = id
        });
    });

    after(() => {
        cy.apagarUsuario(idUsuario);
    });

    beforeEach(() => {
        cy.visit(`${Cypress.env('baseURL')}/login`)
    });

    it('Login com sucesso', () => {
        cy.get(seletoresFormLogin.campoEmail).type(usuarios.usuario1.email)
        cy.get(seletoresFormLogin.campoSenha).type(usuarios.usuario1.password)
        cy.get(seletoresFormLogin.btnEntrar).click()

        cy.url().should('include', '/home')
        cy.contains('Bem Vindo ' + usuarios.usuario1.nome).should('be.visible')
        cy.get('[data-testid="logout"]').should('be.visible')
        cy.get('.row > div').should('be.visible')
    });

    it('Não deve logar com campos em branco', () => {
        cy.get(seletoresFormLogin.btnEntrar).click()

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
        cy.get(seletoresFormLogin.campoEmail).type('gustavoalang13@gmail.com')
        cy.get(seletoresFormLogin.campoSenha).type(usuarios.usuario1.password)
        cy.get(seletoresFormLogin.btnEntrar).click()

        cy.get('.alert > span').should('be.visible')
        cy.get('.alert').should('have.css', 'background-color', 'rgb(243, 150, 154)')
        cy.get('.alert > span').should('have.text', "Email e/ou senha inválidos")
    });

    it('Não deve logar com senha incorreta', () => {
        cy.get(seletoresFormLogin.campoEmail).type(usuarios.usuario1.email)
        cy.get(seletoresFormLogin.campoSenha).type('123')
        cy.get(seletoresFormLogin.btnEntrar).click()

        cy.get('.alert > span').should('be.visible')
        cy.get('.alert').should('have.css', 'background-color', 'rgb(243, 150, 154)')
        cy.get('.alert > span').should('have.text', "Email e/ou senha inválidos")
    });
});