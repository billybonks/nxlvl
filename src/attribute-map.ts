import Attribute from './attribute';
import AttributeMapProxyHandler from './attribute-map/proxy-handler';
import { camelize } from 'humps';

export interface AttributeHash {
  type: string;
  value: any;
}

export default class AttributeMap  {
	attributeNames: Map<string, string>;
  private attributes: Map<string, Attribute>;

  constructor(attributes: { [id: string] : {type:string; name:string; value:any}; } = {}) {
    this.attributes = new Map();
    this.attributeNames = new Map();

    for(let key in attributes){
      let rawAttribute = attributes[key];
      let attribute = new Attribute(rawAttribute.value, rawAttribute.type, rawAttribute.name);
      this.attributes.set(key, attribute);
    }
    // return new Proxy(this, AttributeMapProxyHandler);
  }

  public hasKey(key: string){
    return this.attributes.has(key);
  }

  public get(key: string){
    return this.attributes.get(key);
  }

  public getValue(key: string){
    return this.get(key).value;
  }

  public apply(hash){
    for(let key in hash){
      console.log(key)
      console.log(hash[key])
      this.set(key, hash[key]);
    }
  }

  public set(key:string, attribute:Attribute){
    return this.attributes.set(key, attribute);
  }

  public toHash() {
    let hash = {};
    let itterator = this.attributes.entries();
    let itteration = itterator.next()
    while(!itteration.done) {
      hash[itteration.value[1].name] = itteration.value[1].value;
      itteration = itterator.next();
    }
    return hash;
  }

  public isDirty(){
    let itterator = this.attributes.entries();
    let itteration = itterator.next()
    while(!itteration.done) {
      let value = itteration.value;
      if(itteration.value[1].isDirty == true) {
        return true
      }
      itteration = itterator.next();
    }
    return false;
  }

}
