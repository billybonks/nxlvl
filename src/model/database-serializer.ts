import { camelize, decamelize } from 'humps';

export default class Serializer {
  static serialize(attributes) {
    let hash = {};
    let itterator = attributes.entries();
    let itteration = itterator.next()
    while(!itteration.done) {
      let key = this.transformToDatabaseColumnName(itteration.value[0])
      hash[key] = itteration.value[1].value;
      itteration = itterator.next();
    }
    return hash;
  }

  static deserialize(columns, data) {
    return columns.reduce((acc, item) => {
    	let key = item.name;
      let modelKey = this.transformFromDatabaseColumnName(key);
    	acc[modelKey] = {type:item.type, value:data[key], name:key};
    	return acc;
    }, {});
  }

  static fromDatabaseHash(){

  }

  static transformFromDatabaseColumnName(key){
    return camelize(key);
  }

  static transformToDatabaseColumnName(key){
    return decamelize(key);
  }
}
