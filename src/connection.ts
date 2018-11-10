import knex from 'knex';

export default knex({
  client: 'postgresql',
  connection: 'postgres://localhost/hollywood_angmoh_development',
});
