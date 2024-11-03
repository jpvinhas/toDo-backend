// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'pg',
  connection: {
    database: 'todo-backend',
    user:     'postgres',
    password: 'jp280505'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex-migrations'
  }

};