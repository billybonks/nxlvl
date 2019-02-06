
exports.up = async function(knex, Promise) {
  await knex.schema.createTable('users', function (table) {
    table.bigIncrements();
    table.string('first_name');
    table.string('last_name');
    table.timestamps();
  });

  return  knex.schema.createTable('logins', function (table) {
    table.bigIncrements();
    table.string('user_id');
    table.string('nick');
    table.timestamps();
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('users')
  return knex.schema.dropTable('logins');
};
