import Attribute from './attribute';
import AttributeMapProxyHandler from './attribute-map/proxy-handler';
import { camelize } from 'humps';

export interface AttributeHash {
  type: string;
  value: any;
}

export default class AttributeMap  {
  private attributes: Map<string, Attribute>;

  constructor(attributes: { [id: string] : {type:string; value:any}; } = {}) {
    this.attributes = new Map();
    for(let key in attributes){
      let rawAttribute = attributes[key];
      let attribute = new Attribute(rawAttribute.value, rawAttribute.type);
      this.attributes.set(key, attribute);
    }
    return new Proxy(this, AttributeMapProxyHandler);
  }

  public hasKey(key: string){
    return this.attributes.has(key);
  }

  public get(key: string){
    return this.attributes.get(key);
  }

  public set(key:string, attribute:Attribute){
    return this.attributes.set(key, attribute);
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
