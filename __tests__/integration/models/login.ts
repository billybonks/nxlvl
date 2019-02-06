import Model from '../../../src/model';
import User from './user';

export default class Login extends Model {
	id: string;
	createdAt: Date;
	updatedAt: Date;

  constructor(){
    super(...arguments);
    this.belongsTo(User)
  }

}
