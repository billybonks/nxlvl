import connection from './connection';

class Schema {
  tables: {};

  async load() {
    let tables = await getTables();
    let tablesHash = {};
    for(let i = 0; i < tables.length; i++){
      if(tables[i].indexOf('knex_') == 0){
        continue;
      }
      tablesHash[tables[i]] = await getColumns(tables[i]);
    }
    this.tables = tablesHash
  }
}

export default new Schema();


async function getColumns(table){
  let query = `select column_name, data_type from information_schema.columns where table_name = '${table}' and table_schema = current_schema()`;
  let res = await connection.getConnection().raw(query);
  return res.rows.map(function(row){
    return {
      name: row.column_name,
      type: row.data_type,
    }
  });
}

async function getTables(){
  let res = await  connection.getConnection().raw("select * from information_schema.tables where table_schema = current_schema()");
  return res.rows.map((row) => {
    return row.table_name;
  });

}
