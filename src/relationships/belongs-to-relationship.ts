import Relationship from './relationship';

export default class BelongsToRelationShip extends Relationship {
  get inferedColumn (){
    let relation = this.klass as any
    return `${relation.name.toLowerCase()}Id`;
  }

  get inferedTable (){
    return this.klass.tableName
  }

  query(){
    let klass = this.klass as any;
    return klass.find(this.forigenAttribute.value);
  }
}
