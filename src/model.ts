
import Schema from './schema';
import AttributeSet from './attribute-map';
import ModelProxyHandler from './model/proxy-handler';
import BelongsToRelationship from './relationships/belongs-to-relationship';
import HasManyRelationship from './relationships/has-many-relationship';
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

	static get schema(){
		let tableName = this.tableName;
		let columns =  Schema.tables[tableName];
		return {
			tableName,
			columns
		}
	}
	private applyData(data){
		let stat = this.constructor as any;
		let {tableName, columns} = stat.schema;
		let attributes = DatabaseSerializer.deserialize(columns, data);
		this.attributes = new AttributeSet(attributes);
	}

	static get tableName(){
		return DatabaseSerializer.tableName(this);
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

	belongsTo(klass, options = {columnName: null, tableName: null}) {
		let relation = new BelongsToRelationship(klass,  options);
		relation.forigenAttribute = this.attributes.get(relation.columnName);
		this.attributes.set(decamelize(klass.name), relation)
	}

	hasMany(klass, options = {columnName: null, tableName: null}) {
		let relation = new HasManyRelationship(klass,  options);
		relation.forigenAttribute = this.attributes.get('id');
		this.attributes.set(decamelize(klass.name)+'s', relation)
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

  static where(options) {
    return this.root().where(options);
  }

  static find(id) {
    return this.root({singular:true}).where('id', id);
  }
}
