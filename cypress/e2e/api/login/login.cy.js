describe('Usuário/senha inválidos', () => {
    it('Não deve autenticar', () => {
        const loginInvalido = {
                email: "aaa@aaa.com",
                password: "testeadadaddadad"
        }

        cy.request({
            method: 'POST',
            url: `${Cypress.env('url')}/login`,
            failOnStatusCode: false,
            body: loginInvalido
        }).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body).to.have.property('message')
            expect(response.body.message).to.eq("Email e/ou senha inválidos")
        })
    })
})

describe('Usuário válido', () => {
    it('Deve autenticar', () => {
        const loginValido = {
            email: "fulano@qa.com",
            password: "teste"
        }
        cy.request({
            method: 'POST',
            url: `${Cypress.env('url')}/login`,
            body: loginValido
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property("message")
            expect(response.body).to.have.property("authorization")
            expect(response.body.message).to.eq("Login realizado com sucesso")
        })
    })
})

describe('Body incompleto', () => {
    it('Deve informar senha é obrigatório', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('url')}/login`,
            failOnStatusCode: false,
            body: {
                email: "fulano@qa.com"
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property("password")
            expect(response.body.password).to.eq("password é obrigatório")
        })
    })

    it('Deve informar e-mail é obrigatório', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('url')}/login`,
            failOnStatusCode: false,
            body: {
                password: "aaaaaa"
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property("email")
            expect(response.body.email).to.eq("email é obrigatório")
        })
    })
})

