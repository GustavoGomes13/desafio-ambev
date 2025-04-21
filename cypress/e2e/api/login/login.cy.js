import { usuarios } from "../../../fixtures/usuariosTeste";

describe('Usuário válido', () => {
    let idUsuario
    before(() => {
        cy.criarUsuario(usuarios.usuario1).then((id) => {
            idUsuario = id
        });
    });

    after(() => {
        cy.apagarUsuario(idUsuario);
    });

    it('Deve autenticar', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('url')}/login`,
            body: {
                email: usuarios.usuario1.email,
                password: usuarios.usuario1.password
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property("message")
            expect(response.body).to.have.property("authorization")
            expect(response.body.message).to.eq("Login realizado com sucesso")
        });
    });
});

describe('Informações inválidas', () => {
    it('E-mail inválido', () => {
        const loginInvalido = {
                email: "aaa.com",
                password: "teste"
        }

        cy.request({
            method: 'POST',
            url: `${Cypress.env('url')}/login`,
            failOnStatusCode: false,
            body: loginInvalido
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('email')
            expect(response.body.email).to.eq("email deve ser um email válido")
        });
    });
});

describe('Validações do body da request', () => {
    it('Deve informar que e-mail/senha são obrigatórios', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('url')}/login`,
            failOnStatusCode: false,
            body: {
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property("email")
            expect(response.body).to.have.property("password")
            expect(response.body.email).to.eq("email é obrigatório")
            expect(response.body.password).to.eq("password é obrigatório")
        });
    });

    it('Deve informar que e-mail/senha não pode ficar em branco', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('url')}/login`,
            failOnStatusCode: false,
            body: { 
                email: "",
                password: ""
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property("email")
            expect(response.body).to.have.property("password")
            expect(response.body.email).to.eq("email não pode ficar em branco")
            expect(response.body.password).to.eq("password não pode ficar em branco")
        });
    });


    it('Deve informar que e-mail/senha devem ser uma string', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('url')}/login`,
            failOnStatusCode: false,
            body: { 
                email: null,
                password: null
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property("email")
            expect(response.body).to.have.property("password")
            expect(response.body.email).to.eq("email deve ser uma string")
            expect(response.body.password).to.eq("password deve ser uma string")
        });
    });

    it('Deve infromar que e-mail/senha devem ser obrigatórios', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('url')}/login`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property("email")
            expect(response.body).to.have.property("password")
            expect(response.body.email).to.eq("email é obrigatório")
            expect(response.body.password).to.eq("password é obrigatório")
        });
    });

    it('Deve informar que propriedade não é permitida', () => {
        const invalidProperty = "cargo"
        cy.request({
            method: 'POST',
            url: `${Cypress.env('url')}/login`,
            failOnStatusCode: false,
            body: {
                email: usuarios.usuario1.email,
                password: usuarios.usuario1.password,
                [invalidProperty]: "teste"
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property(invalidProperty)
            expect(response.body[invalidProperty]).to.eq(`${invalidProperty} não é permitido`)
        });
    });
});