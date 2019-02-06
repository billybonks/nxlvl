
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('logins').del()
    .then(function () {
      // Inserts seed entries
      return knex('logins').insert([
        {nick: 'sebby', user_id:1},
        {nick: 'debby', user_id:1},
        {nick: 'lebby', user_id:1}
      ]);
    });
};
