export const usuarioSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Schema de Usuário",
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
        "minLength": 2,
        "description": "Senha do usuário"
      },
      "administrador": {
        "type": "string",
        "enum": ["true", "false"],
        "description": "Indica se o usuário tem privilégios administrativos"
      },
      "_id": {
        "type": "string",
        "pattern": "^[a-zA-Z0-9]{16}$",
        "description": "ID único do usuário"
      }
    },
    "additionalProperties": false
  }