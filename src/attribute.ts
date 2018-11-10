export interface AttributeInterface {
  type: 'string';
  value: any;
  isDirty: boolean;
}

export default class Attribute implements AttributeInterface {
  public type: "string";
  private newValue?: any;
  private originalValue: any;

  constructor(value, type) {
    this.type = type;
    this.value = value;
    this.originalValue = value;
  }

  public get value() {
    return this.newValue
  }

  public set value(value) {
    this.newValue = value;
  }

  public get isDirty(){
    return this.newValue != this.originalValue;
  }

  public apply(){
    this.originalValue = this.newValue;
  }
}
