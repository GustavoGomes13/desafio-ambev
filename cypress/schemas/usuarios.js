export const usuariosSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Schema de Resposta de Usuários",
    "type": "object",
    "required": ["quantidade", "usuarios"],
    "properties": {
      "quantidade": {
        "type": "number",
        "description": "Quantidade total de usuários retornados",
        "minimum": 0
      },
      "usuarios": {
        "type": "array",
        "items": {
          "type": "object",
          "required": ["nome", "email", "password", "administrador", "_id"],
          "properties": {
            "nome": {
              "type": "string",
              "description": "Nome completo do usuário",
              "minLength": 1
            },
            "email": {
              "type": "string",
              "format": "email",
              "description": "Endereço de e-mail do usuário"
            },
            "password": {
              "type": "string",
              "description": "Senha do usuário",
              "minLength": 2
            },
            "administrador": {
              "type": "string",
              "enum": ["true", "false"],
              "description": "Indica se o usuário tem privilégios de administrador"
            },
            "_id": {
              "type": "string",
              "description": "ID único do usuário",
              "pattern": "^[a-zA-Z0-9]{16}$",
              "minLength": 16,
              "maxLength": 16
            }
          },
          "additionalProperties": false
        }
      }
    },
    "additionalProperties": false
  }