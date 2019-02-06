import Relationship from './relationship';

export default class HasManyRelationShip extends Relationship {
  query(){
    let klass = this.klass as any;
    return klass.where({[this.columnName]: this.forigenAttribute.value});
  }
}
