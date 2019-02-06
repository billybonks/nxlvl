import Model from './../model';
import Attribute from './../attribute';

export interface RelationshipOptions {
  columnName: 'string';
  tableName: 'string';
}


export default abstract class Relationship extends Attribute {
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
    return this.query();
  }

  public set value(value) {
    super.value = value;
  }

	protected query(): any {
		throw new Error("Method not implemented.");
	}

}
