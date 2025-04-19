export const usuariosAdm = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Schema de Resposta de Usuários",
    "type": "object",
    "required": ["quantidade", "usuarios"],
    "properties": {
      "quantidade": {
        "type": "integer",
        "minimum": 0,
        "description": "Quantidade total de usuários retornados"
      },
      "usuarios": {
        "type": "array",
        "items": {
          "type": "object",
          "required": ["nome", "email", "password", "administrador", "_id"],
          "properties": {
            "nome": {
              "type": "string",
              "minLength": 1,
              "description": "Nome completo do usuário"
            },
            "email": {
              "type": "string",
              "format": "email",
              "description": "Endereço de e-mail válido"
            },
            "password": {
              "type": "string",
              "minLength": 1,
              "description": "Senha do usuário"
            },
            "administrador": {
              "type": "string",
              "enum": ["true"],
              "description": "Indica se o usuário tem privilégios administrativos"
            },
            "_id": {
              "type": "string",
              "minLength": 1,
              "description": "ID único do usuário"
            }
          },
          "additionalProperties": false
        }
      }
    },
    "additionalProperties": false
  }