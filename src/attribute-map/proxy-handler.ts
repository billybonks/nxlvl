export default {
get(target, prop, receiver){
    if(target.hasKey(prop)){
      return target.attributes.get(prop).value;
    }
    if(typeof target[prop] == 'function'){
      return target[prop].bind(target);
    }
  },
set(target, prop, value) {
    if(target.hasKey(prop)){
      return target.attributes.get(prop).value = value;
    }
  }
}
