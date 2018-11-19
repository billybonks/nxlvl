import Model from './../model';
import Attribute from './../attribute';

export interface RelationshipOptions {
  columnName: 'string';
  tableName: 'string';
}


export default class Relationship extends Attribute {
  protected options: {columnName: string, tableName: string};
  protected klass: Model;
  protected isLoaded: boolean;
  public forigenAttribute: Attribute;

  constructor(klass, options:RelationshipOptions = {columnName: null, tableName: null}){
    super(null, klass);
    this.klass = klass;
    this.options = options;
  }

  public get inferedColumn(){
    return null;
  }

  public get inferedTable(){
    return null;
  }

  public get columnName(){
    return this.options.columnName || this.inferedColumn;
  }

  public get tableName(){
    return this.options.tableName || this.inferedTable;
  }

  public get value() {
    if(!this.isLoaded) {
      let value = this.load();
      this.value = value;
    }
    return Promise.resolve(super.value);
  }

  public set value(value) {
    super.value = value;
  }

  protected async load(){
    let klass = this.klass as any;
    let value = await klass.find(this.forigenAttribute.value)
    this.isLoaded = true;
    return value;
  }

}
