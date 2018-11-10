
import Schema from './schema';
import AttributeSet from './attribute-map';
import ModelProxyHandler from './model/proxy-handler';
import BelongsToRelationShip from './relationships/belongs-to-relationship';
import queryBuilder from './query-builder';
import { camelize, decamelize } from 'humps';
import { RelationshipOptions } from './relationships/relationship';

export default class Model {
	tableName: string;
  attributes: AttributeSet;

  constructor(data = {}){
		let consttruct = this.constructor as any;
    let tableName = consttruct.tableName;
    let columns =  Schema.tables[tableName];
    let attributes = columns.reduce(function(acc, item){
      let key = item.name;
      acc[camelize(key)] = {type:item.type, value:data[key]};
      return acc;
    }, {});
    this.attributes = new AttributeSet(attributes);
    return new Proxy(this, ModelProxyHandler);
  }


  static get tableName(){
    return `${decamelize(this.name)}s`;
  }

  save(){
    // if(!this.id){
    //   this.create();
    // } else {
    //   this.update();
    // }
  }

  async update(){
    // let d = new Date(Date.now())
    // let date = d.toUTCString();
    // this._data.updated_at = date;
    // return this.root()
    // .where('id', '=', this._data.id)
    // .update(this._data).returning('*');
  }

  async create(){
    // let d = new Date(Date.now())
    // let date = d.toGMTString();
    // let data = {
    //   updated_at: d,
    //   created_at: d,
    //   ...this._data,
    // }
    // let result = await knex(this.tableName).insert(data).returning('*');
    // this._data = result[0];
  }

  root(options = {}) {
    return queryBuilder(this, options);
  }

	belongsTo(klass) {
		let relation = new BelongsToRelationShip(klass,  {columnName: null, tableName: null});
		relation.forigenAttribute = this.attributes.get(relation.columnName);
		this.attributes.set(decamelize(klass.name), relation)
	}

  static root(options = {}) {
    return queryBuilder(this, options);
  }

  static select() {
    return this.root().select(...arguments);
  }

  static all() {
    return this.root()
  }

  static where() {
    return this.root().all();
  }

  static find(id) {
    return this.root({singular:true}).where('id', id);
  }
}
