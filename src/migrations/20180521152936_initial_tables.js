exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('work_status', function (table) {
            table.increments('work_status_id'); //adds auto-incrementing primary key
            table.string('name').notNullable();  // required (nullable is the default)
            table.boolean('enabled').notNullable();
        }),

        knex.schema.createTable('party_type', function (table) {
            table.increments('party_type_id');
            table.string('name').notNullable();
            table.boolean('enabled').notNullable();
        }),

        knex.schema.createTable('party', function (table) {
            table.increments('party_id');
            table.string('name').notNullable();
            //foreign key
            table.integer('party_type_id').unsigned().notNullable().references('party_type_id').inTable('party_type')
        }),

        knex.schema.createTable('party_relationship_type', function (table) {
            table.increments('party_relationship_type_id');
            table.string('name').notNullable();
            table.boolean('enabled').notNullable();
        }),

        knex.schema.createTable('party_relationship', function (table) {
            table.integer('party_id_1').unsigned().notNullable().references('party_id').inTable('party');
            table.integer('party_id_2').unsigned().notNullable().references('party_id').inTable('party');
            table.integer('party_relationship_type_id').unsigned().notNullable()
                .references('party_relationship_type_id').inTable('party_relationship_type');

            table.primary(['party_id_1', 'party_id_2']) // composite primary key
        }),

        knex.schema.createTable('work', function (table) {
            table.increments('work_id');
            table.string('reference');
            table.integer('work_status_id').unsigned().notNullable().references('work_status_id')
                .inTable('work_status');
            table.integer('party_id').unsigned().notNullable().references('party_id')
                .inTable('party');
            table.dateTime('date_created').notNullable();
            table.dateTime('date_modified').notNullable();
        })
    ]);
}

exports.down = function (knex, Promise) {
    return Promise.all([knex.schema.dropTable('work'),
                        knex.schema.dropTable('party_relationship'),
                        knex.schema.dropTable('party_relationship_type'),
                        knex.schema.dropTable('party'),
                        knex.schema.dropTable('party_type'),
                        knex.schema.dropTable('work_status')]);
}
