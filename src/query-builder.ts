import chalk from 'chalk';
import connection from './connection';

function instrument(builder, modelClass){
  let startTime = null;
  let cachedQuery = null;
  builder.on('start', (options) => {
    startTime = Date.now();
  })
  builder.on('query', (options) => {
    cachedQuery = options.sql;
  })
  builder.on('error', (options) => {
    let model = chalk.bold(chalk`{red ERROR} {red ${modelClass.name}}`)
    console.log(chalk`${model} {red ${cachedQuery}}`);
  })
  builder.on('end', (options) => {
    let endTime = Date.now();
    let delta = endTime - startTime;
    let model = chalk.bold(chalk`{cyan ${modelClass.name} (${delta.toString()}ms)}`)
    console.log(chalk`${model} {cyan ${cachedQuery}}`);
  })
}

function nxlvlThen(builder, modelClass, options){
  let originalThen = builder.then;
  let constructFunction = modelClass;
  builder.then = async function() {
    let promise = new Promise((resolve, reject) => {
      debugger
      originalThen.call(builder, (results) => {
        let resultObjects = results.map(function(result){
          return new constructFunction(result);
        });
        if(options.singular){
          resolve(resultObjects[0]);
        } else {
          resolve(resultObjects);
        }
      })
    });
    return promise.then(...arguments)
  }
}

export default {
  finder(modelClass, options){
    let root = connection.getConnection()(modelClass.tableName)
    instrument.call(this, root, modelClass);
    nxlvlThen.call(this, root, modelClass, options);
    return root
  },

  modifier(modelClass, options){
    let root = connection.getConnection()(modelClass.tableName)
    instrument.call(this, root, modelClass);
    return root
  }
}
