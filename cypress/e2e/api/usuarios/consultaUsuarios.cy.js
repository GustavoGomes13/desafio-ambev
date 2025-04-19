import { usuariosSchema } from "../../../schemas/usuarios";
import { usuarioSchema } from "../../../schemas/usuario";
import { expectSchema } from "../../../support/e2e";
import { usuariosAdm } from "../../../schemas/usuariosAdm";
import { usuariosNaoAdm } from "../../../schemas/usuariosNaoAdm";

describe('Consulta de usuários', () => {
    const nomeUsuario = "Michael Scott"
    const emailUsuario = "michael.g.scott@teste.com"
    const passwordUsuario = "michael@TheOffice.1234567890"
    const admUsuario = true
    let idUsuario

    before(() => {
        cy.request('POST', `${Cypress.env('url')}/usuarios`, {
            nome: nomeUsuario,
            email: emailUsuario,
            password: passwordUsuario,
            administrador: `${admUsuario}`
        });

        cy.request('GET', `${Cypress.env('url')}/usuarios?nome=${encodeURIComponent(nomeUsuario)}`).then((response) => {
            idUsuario = response.body.usuarios[0]._id
        })
    })

    after(() => {
        cy.request('DELETE', `${Cypress.env('url')}/usuarios/${idUsuario}`)
    })

    it('Deve listar usuários', () => {   
        cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/usuarios`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
            expectSchema(response.body).to.be.jsonSchema(usuariosSchema);
        });
    });

    it('Deve retornar o usuário com o id consultado endpoint de usuarios por id', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/usuarios/${idUsuario}`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
            expectSchema(response.body).to.be.jsonSchema(usuarioSchema);
            expect(response.body.nome).to.be.eq(nomeUsuario)
            expect(response.body.email).to.eq(emailUsuario);
            expect(response.body.password).to.eq(passwordUsuario);
            expect(response.body.administrador).to.eq(`${true}`);
            expect(response.body._id).to.eq(idUsuario);
        });
    });

    it('Deve retornar o usuário com o id endpoint usuarios', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/usuarios?_id=${idUsuario}`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
            expectSchema(response.body).to.be.jsonSchema(usuariosSchema);
            expect(response.body.usuarios[0].nome).to.be.eq(nomeUsuario)
            expect(response.body.usuarios[0].email).to.eq(emailUsuario);
            expect(response.body.usuarios[0].password).to.eq(passwordUsuario);
            expect(response.body.usuarios[0].administrador).to.eq(`${true}`);
            expect(response.body.usuarios[0]._id).to.eq(idUsuario);
        });
    })

    it('Deve retornar o usuário com o nome consultado', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/usuarios?nome=${encodeURIComponent(nomeUsuario)}`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
            expectSchema(response.body).to.be.jsonSchema(usuariosSchema);
            expect(response.body.usuarios[0].nome).to.be.eq(nomeUsuario)
            expect(response.body.usuarios[0].email).to.eq(emailUsuario);
            expect(response.body.usuarios[0].password).to.eq(passwordUsuario);
            expect(response.body.usuarios[0].administrador).to.eq(`${true}`);
            expect(response.body.usuarios[0]._id).to.eq(idUsuario);
        });
    })

    it('Deve retornar o usuário com o e-mail consultado', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/usuarios?email=${encodeURIComponent(emailUsuario)}`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
            expect(response.body.usuarios[0].nome).to.be.eq(nomeUsuario);
            expect(response.body.usuarios[0].email).to.eq(emailUsuario);
            expect(response.body.usuarios[0].password).to.eq(passwordUsuario);
            expect(response.body.usuarios[0].administrador).to.eq(`${true}`);
            expect(response.body.usuarios[0]._id).to.eq(idUsuario);
        });
    })

    it('Deve retornar o usuário com a senha consultado', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/usuarios?password=${passwordUsuario}`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
            expect(response.body.usuarios[0].nome).to.be.eq(nomeUsuario);
            expect(response.body.usuarios[0].email).to.eq(emailUsuario);
            expect(response.body.usuarios[0].password).to.eq(passwordUsuario);
            expect(response.body.usuarios[0].administrador).to.eq(`${true}`);
            expect(response.body.usuarios[0]._id).to.eq(idUsuario);
        });
    })

    it('Deve retornar o usuário com o parametro administrador true consultado', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/usuarios?administrador=${admUsuario}`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
            expectSchema(response.body).to.be.jsonSchema(usuariosAdm);
            // expect(response.body.usuarios[0].nome).to.be.eq(nomeUsuario);
            // expect(response.body.usuarios[0].email).to.eq(emailUsuario);
            // expect(response.body.usuarios[0].password).to.eq(passwordUsuario);
            // expect(response.body.usuarios[0].administrador).to.eq(`${true}`);
            // expect(response.body.usuarios[0]._id).to.eq(idUsuario);
        });
    })

    it('Deve retornar o usuário com o parametro administrador false consultado', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/usuarios?administrador=false`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
            expectSchema(response.body).to.be.jsonSchema(usuariosNaoAdm);
        });
    })
});

describe("Consulta de usuários sem sucesso", () => {
    const nomeUsuarioInexistente = "1111"
    const emailInexistente = "teste@gyahoomail.com"
    const passwordInexistente = "gasdfafgearadsfegaghhtyyu"

    it('Deve retornar mensagem de id inválido', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/usuarios/1`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('id');
            expect(response.body.id).to.eq("id deve ter exatamente 16 caracteres alfanuméricos")
        });
    })

    it('Deve retornar mensagem de usuário não encontrado', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/usuarios/1234567890aaaaaa`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.eq("Usuário não encontrado")
        });
    });

    it('Deve retornar lista zerada na busca pelo ID no endpoint de lista', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/usuarios?_id=1`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('quantidade');
            expect(response.body).to.have.property('usuarios');
            expect(response.body.quantidade).to.eq(0);
            expect(response.body.usuarios).to.be.an('array');
        });
    });

    it('Deve retornar lista zerada na busca pelo nome', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/usuarios?nome=${nomeUsuarioInexistente}`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('quantidade');
            expect(response.body).to.have.property('usuarios');
            expect(response.body.quantidade).to.eq(0);
            expect(response.body.usuarios).to.be.an('array');
        });
    });

    it('Deve retornar lista zerada na busca pelo e-mail', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/usuarios?email=${encodeURIComponent(emailInexistente)}`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('quantidade');
            expect(response.body).to.have.property('usuarios');
            expect(response.body.quantidade).to.eq(0);
            expect(response.body.usuarios).to.be.an('array');
        });
    });

    it('Deve retornar mensagem de e-mail inválido', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/usuarios?email=${encodeURIComponent("@mail.com")}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('email');
            expect(response.body.email).to.eq('email deve ser um email válido');
        });
    });

    it('Deve retornar lista zerada na busca por senha', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/usuarios?password=${passwordInexistente}`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('quantidade');
            expect(response.body).to.have.property('usuarios');
            expect(response.body.quantidade).to.eq(0);
            expect(response.body.usuarios).to.be.an('array');
        });
    });

    it('Deve retornar lista zerada na busca por senha', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/usuarios?password=${passwordInexistente}`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('quantidade');
            expect(response.body).to.have.property('usuarios');
            expect(response.body.quantidade).to.eq(0);
            expect(response.body.usuarios).to.be.an('array');
        });
    });

    it('Deve retornar mensagem que adminstrador deve ser bool', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/usuarios?administrador=jorge`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('administrador');
            expect(response.body.administrador).to.eq("administrador deve ser 'true' ou 'false'");
        });
    });
})

describe("Consulta de dois usuários diferentes na mesma request", () => {
    const nomeUsuario = "Michael Scott"
    const emailUsuario = "michael.g.scott@teste.com"
    const passwordUsuario = "michael@TheOffice.1234567890"
    const admUsuario = true
    let idUsuario

    const nomeUsuario2 = "Dwight Schrute"
    const emailUsuario2 = "dwight.k.schrute@teste.com"
    const passwordUsuario2 = "dwight@TheOffice.1234567890"
    const admUsuario2 = false
    let idUsuario2

    before(() => {
        cy.request('POST', `${Cypress.env('url')}/usuarios`, {
            nome: nomeUsuario,
            email: emailUsuario,
            password: passwordUsuario,
            administrador: `${admUsuario}`
        });

        cy.request('POST', `${Cypress.env('url')}/usuarios`, {
            nome: nomeUsuario2,
            email: emailUsuario2,
            password: passwordUsuario2,
            administrador: `${admUsuario2}`
        });

        cy.request('GET', `${Cypress.env('url')}/usuarios?nome=${encodeURIComponent(nomeUsuario)}`).then((response) => {
            idUsuario = response.body.usuarios[0]._id
        })

        cy.request('GET', `${Cypress.env('url')}/usuarios?nome=${encodeURIComponent(nomeUsuario2)}`).then((response) => {
            idUsuario2 = response.body.usuarios[0]._id
        })
    })

    after(() => {
        cy.request('DELETE', `${Cypress.env('url')}/usuarios/${idUsuario}`)
        cy.request('DELETE', `${Cypress.env('url')}/usuarios/${idUsuario2}`)
    })

    it('Deve retornar lista zerada na busca de dois parametros diferentes', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/usuarios?nome=${encodeURIComponent(nomeUsuario)}&email=${encodeURIComponent(emailUsuario2)}`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('quantidade');
            expect(response.body).to.have.property('usuarios');
            expect(response.body.quantidade).to.eq(0);
            expect(response.body.usuarios).to.be.an('array');
        });
    });
})