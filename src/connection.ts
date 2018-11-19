import knex from 'knex';

class Connection {
  public config: any;

  configure(config: {}){
    this.config = config;
  }

  getConnection(){
    console.log(this.config)
    return knex(this.config);
  }

  destroy(){
    this.getConnection().client.pool.destroyer();
  }
}

export default new Connection();
