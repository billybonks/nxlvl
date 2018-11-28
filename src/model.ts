
import Schema from './schema';
import AttributeSet from './attribute-map';
import ModelProxyHandler from './model/proxy-handler';
import BelongsToRelationShip from './relationships/belongs-to-relationship';
import queryBuilder from './query-builder';
import DatabaseSerializer from './model/database-serializer'
import { decamelize } from 'humps';

export default class Model {
	tableName: string;
  attributes: AttributeSet;
	databaseSerializer: DatabaseSerializer;

  constructor(data = {}){
		this.applyData(data)
    return new Proxy(this, ModelProxyHandler);
  }

	private applyData(data){
		let consttruct = this.constructor as any;
		let tableName = consttruct.tableName;
		let columns =  Schema.tables[tableName];
		let attributes = DatabaseSerializer.deserialize(columns, data);
		this.attributes = new AttributeSet(attributes);
	}

  static get tableName() {
    return `${decamelize(this.name)}s`;
  }

  save() {
		let id = this.attributes.get('id').value;
    if(!id){
      return this.create();
    } else {
      return this.update();
    }
  }

  async update(){
    let d = new Date(Date.now())
    let date = d.toUTCString();
		this.attributes.get('updatedAt').value = date;
		let hash = this.serialize();
		let id = hash.id
    return this.root()
    .where('id', '=', id)
    .update(hash).returning('*');
  }

  async create() {
    let d = new Date(Date.now())
    let date = d.toUTCString();
		this.attributes.get('updatedAt').value = date;
		this.attributes.get('createdAt').value = date;
		let data = this.serialize();
    let results = await this.root().insert(data).returning('*');
    this.applyData(results[0]);
  }

  root(options = {}) {
    return queryBuilder.modifier(this.constructor, options);
  }

	belongsTo(klass) {
		let relation = new BelongsToRelationShip(klass,  {columnName: null, tableName: null});
		relation.forigenAttribute = this.attributes.get(relation.columnName);
		this.attributes.set(decamelize(klass.name), relation)
	}

	serialize() {
		return DatabaseSerializer.serialize(this.attributes) as any;
	}
  static root(options = {}) {
    return queryBuilder.finder(this, options);
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
