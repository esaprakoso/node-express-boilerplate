
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'JS Backend API',
    version: '1.0.0',
    description: 'API documentation for backend with JWT and PostgreSQL'
  },
  paths: {
    "/api/auth/login":{
      post: {
        summary: "Otentifikasi",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string", example: "usertest" },
                  password: { type: "string", example: "1233442" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Data user terotentifikasi",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user:{
                      type: "object",
                      properties:{
                        username: { type: "string", example: "usertest" },
                        name: { type: "string", example: "test" },
                        role: { type: "string", example: "user" },
                      }
                    },
                    token: { type: "string", example: "123456789" }
                  },
                },
              },
            },
          },
          401: {
            description: "Data user tidak ditemukan",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string", example: "Invalid credentials" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/auth/register":{
      post: {
        summary: "Otentifikasi",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string", example: "usertest" },
                  password: { type: "string", example: "1233442" },
                  role: { type: "string", example: "user" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Data user terotentifikasi",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: {
                      type: "object",
                      properties: {
                        username: { type: "string", example: "usertest" },
                        password: { type: "string", example: "1233442" },
                        role: { type: "string", example: "user" },
                      }
                    }
                  },
                },
              },
            },
          },
          409: {
            description: "User Exists",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string", example: "User Exists" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/users": {
      get: {
        summary: "Lihat semua data user",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Daftar semua user",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties:{
                    data:{
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/User",
                      },
                    }
                  }
                },
              },
            },
          },
        },
      },
    },
    "/api/users/{id}": {
      get: {
        summary: "Lihat user berdasarkan ID",
        tags: ["Users"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "User ditemukan",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: {
                      $ref: "#/components/schemas/User",
                    }
                  }
                },
              },
            },
          },
          404: {
            description: "User tidak ditemukan",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update user berdasarkan ID",
        tags: ["Users"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string", example: "usertest" },
                  name: { type: "string", example: "test" },
                  role: { type: "string", example: "user" },
                }
              },
            },
          },
        },
        responses: {
          200: {
            description: "User berhasil diupdate",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/User",
                      }
                    }
                  }
                },
              },
            },
          },
          404: {
            description: "User tidak ditemukan",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Hapus user berdasarkan ID",
        tags: ["Users"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "User berhasil dihapus",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "User deleted" },
                  },
                },
              },
            },
          },
          404: {
            description: "User tidak ditemukan",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/profile": {
      get: {
        summary: "Lihat profil",
        tags: ["Profile"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Profil ditemukan",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: {
                      $ref: "#/components/schemas/User",
                    }
                  }
                },
              },
            },
          },
          404: {
            description: "Profil tidak ditemukan",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      patch: {
        summary: "Ubah profil",
        tags: ["Profile"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties:{
                  username: { type: "string", example: "usertest" },
                  name: { type: "string", example: "test" },
                  role: { type: "string", example: "user" },
                }
              },
            },
          },
        },
        responses: {
          200: {
            description: "Ubah profil per session",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: {
                      $ref: "#/components/schemas/User",
                    }
                  }
                },
              },
            },
          },
          404: {
            description: "User tidak ditemukan",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/api/profile/password": {
      patch: {
        summary: "Ubah password per profil sesuai session",
        tags: ["Profile"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserUpdatePassword",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Password sukses diubah",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: {
                      $ref: "#/components/schemas/User",
                    }
                  }
                },
              },
            },
          },
          404: {
            description: "User tidak ditemukan",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          username: { type: "string", example: "usertest" },
          name: { type: "string", example: "test" },
          role: { type: "string", example: "user" },
        },
      },
      UserUpdate: {
        type: "object",
        properties: {
          username: { type: "string", example: "usertest" },
          name: { type: "string", example: "test" },
          role: { type: "string", example: "user" },
        },
      },
      UserUpdatePassword: {
        type: "object",
        properties: {
          new_password: { type: "string", example: "12345678" },
          confirm_new_password: { type: "string", example: "12345678" },
        },
      },
      Error: {
        type: "object",
        properties: {
          error: { type: "string", example: "Not found" },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
