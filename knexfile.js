// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",

    connection: {
      database: "bloggie",
      user: "postgres",
      password: "",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "data/migrations",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "bloggie_stage",
      user: "user",
      password: "pass",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "bloggie",
      user: "prod_db",
      password: "secret_password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
