import knex from 'knex';

let knexable = null;
class Connection {
  public config: any;

  configure(config: {}){
    this.config = config;
  }

  getConnection(){
    if(knexable){
      return knexable;
    } else {
      knexable = knex(this.config);
      return knexable;
    }
  }

  async destroy(){
    await this.getConnection().destroy()
    knexable = null;
  }
}

export default new Connection();
