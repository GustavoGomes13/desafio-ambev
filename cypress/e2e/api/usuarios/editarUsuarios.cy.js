import { usuarios } from "../../../fixtures/usuariosTeste";

let idUsuario

describe('Edição de usuário', () => {
    beforeEach(() => {
        cy.criarUsuario(usuarios.usuario1).then((id) => {
            idUsuario = id
        });
    });

    afterEach(() => {
        cy.apagarUsuario(idUsuario);
    });

    it('Deve editar o usuário', () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('url')}/usuarios/${idUsuario}`,
            body: {
                nome: usuarios.usuarioEditado.nome,
                email: usuarios.usuarioEditado.email,
                password: usuarios.usuarioEditado.password,
                administrador: `${usuarios.usuarioEditado.admUsuario}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.eq("Registro alterado com sucesso");
        });

        cy.request({
            method: 'GET',
            url: `${Cypress.env('url')}/usuarios/${idUsuario}`
        }).then((response) => {
            expect(response.body.nome).to.eq(usuarios.usuarioEditado.nome);
            expect(response.body.email).to.eq(usuarios.usuarioEditado.email);
            expect(response.body.password).to.eq(usuarios.usuarioEditado.password);
            expect(response.body.administrador).to.eq(`${usuarios.usuarioEditado.admUsuario}`);
            expect(response.body._id).to.eq(idUsuario);
        });
    });

    it('Não deve permitir editar usuário enviando o body vazio', () => {
        const propriedades = {
            "nome": "nome é obrigatório",
            "email": "email é obrigatório",
            "password": "password é obrigatório",
            "administrador": "administrador é obrigatório"
        }

        cy.request({
            method: 'PUT',
            url: `${Cypress.env('url')}/usuarios/${idUsuario}`,
            failOnStatusCode: false,
            body: {}
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.all.keys(Object.keys(propriedades));
            Object.keys(propriedades).forEach((key) => {
                expect(response.body[key]).to.eq(propriedades[key])
            });
        });
    });

    it('Não deve permitir editar com proprieades do tipo inválido', () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('url')}/usuarios/${idUsuario}`,
            failOnStatusCode: false,
            body: {
                nome: usuarios.usuarioEditado.nome,
                email: "@mail.com",
                password: usuarios.usuarioEditado.password,
                administrador: "teste"
            }
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.an.property('email');
            expect(response.body).to.have.an.property('administrador');
            expect(response.body.email).to.eq("email deve ser um email válido");
            expect(response.body.administrador).to.eq("administrador deve ser 'true' ou 'false'");
        });
    });

    it('Não deve permitir editar com propriedades inesperadas', () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('url')}/usuarios/${idUsuario}`,
            failOnStatusCode: false,
            body: {
                nome: usuarios.usuarioEditado.nome,
                email: usuarios.usuarioEditado.email,
                password: usuarios.usuarioEditado.password,
                administrador: `${usuarios.usuarioEditado.admUsuario}`,
                time: "Flamengo"
            }
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('time');
            expect(response.body.time).to.eq("time não é permitido");
        });
    });

    it('Não deve permitir editar usuário enviando proprieades em branco', () => {
        const propriedades = {
            "nome": "nome não pode ficar em branco",
            "email": "email não pode ficar em branco",
            "password": "password não pode ficar em branco",
            "administrador": "administrador deve ser 'true' ou 'false'"
        }
        
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('url')}/usuarios/${idUsuario}`,
            failOnStatusCode: false,
            body: {
                nome: "",
                email: "",
                password: "",
                administrador: ""
            }
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.all.keys(Object.keys(propriedades));
            Object.keys(propriedades).forEach((key) => {
                expect(response.body[key]).to.eq(propriedades[key]);
            });
        });
    });
});

describe('Criação de usuário através do PUT', () => {

    after(() => {
        cy.request('GET', `${Cypress.env('url')}/usuarios?nome=${encodeURIComponent(usuarios.usuario1.nome)}`).then((response) => {
            idUsuario = response.body.usuarios[0]._id
        });
        cy.apagarUsuario(idUsuario);
    })

    it('Deve criar um novo usuário', () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('url')}/usuarios/aaaaaaaaaaa`,
            body: {
                nome: usuarios.usuario1.nome,
                email: usuarios.usuario1.email,
                password: usuarios.usuario1.password,
                administrador: `${usuarios.usuario1.admUsuario}`
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('message');
            expect(response.body).to.have.property('_id');
            expect(response.body.message).to.eq("Cadastro realizado com sucesso");
            idUsuario = response.body._id
        });
    });
});

describe('Edição com e-mail já cadastrado', () => {
    let idUsuario2

    before(() => {
        cy.criarUsuario(usuarios.usuario1).then((id) => {
            idUsuario = id
        });

        cy.request('POST', `${Cypress.env('url')}/usuarios`, {
            nome: usuarios.usuario2.nome,
            email: usuarios.usuario2.email,
            password: usuarios.usuario2.password,
            administrador: `${usuarios.usuario2.admUsuario}`
        });

        cy.request('GET', `${Cypress.env('url')}/usuarios?nome=${encodeURIComponent(usuarios.usuario2.nome)}`).then((response) => {
            idUsuario2 = response.body.usuarios[0]._id
        });
    });

    after(() => {
        cy.apagarUsuario(idUsuario);
        cy.apagarUsuario(idUsuario2);
    });

    it('Não deve permitir editar com um e-mail já cadastrado', () => {
        cy.request({
            method: 'PUT',
            url: `${Cypress.env('url')}/usuarios/${idUsuario}`,
            failOnStatusCode: false,
            body: {
                nome: usuarios.usuario1.nome,
                email: usuarios.usuario2.email,
                password: usuarios.usuario1.password,
                administrador: `${usuarios.usuario1.admUsuario}`
            }
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.eq("Este email já está sendo usado");
        });
    });
});