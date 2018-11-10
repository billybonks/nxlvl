export default {
get(target, prop, receiver){
    if(target.attributes.hasKey(prop)){
      return target.model[prop];
    }
    if(typeof target[prop] == 'function'){
      return target[prop].bind(target);
    }
  },
set(target, prop, value) {
    if(target.attributes.hasKey(prop)){
      return target.attributes[prop] = value;
    }
  }
}
