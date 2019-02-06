
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {first_name: 'seb'},
        {first_name: 'mo'},
        {first_name: 'abdulla'}
      ]);
    });
};
