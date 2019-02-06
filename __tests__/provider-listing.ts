import Model from '../src/model';
import Movie from './movie'

export default class ProviderListing extends Model {
  constructor(data){
    super(data);
    this.belongsTo(Movie);
  }
}
