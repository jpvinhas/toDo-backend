exports.up = function(knex) {
    return knex.schema.createTable('tasks' , table => {
        table.increments('id').primary()
        table.string('title').notNullable()
        table.boolean('done').defaultTo(false)
        // table.string('desc')
        // table.datetime('createdAt')
        // table.datetime('estimatedAt')
        // table.datetime('doneAt')
        // table.integer('userId').references('id')
        //     .inTable('users').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tasks')
};
