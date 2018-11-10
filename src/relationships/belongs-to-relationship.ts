import Relationship from './relationship';

export default class BelongsToRelationShip extends Relationship {
  get inferedColumn (){
    return `${this.klass.tableName}Id`;
  }

  get inferedTable (){
    return this.klass.tableName
  }
}
