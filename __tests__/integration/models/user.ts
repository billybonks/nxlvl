import Model from '../../../src/model';
import Login from './login';

export default class User extends Model {
	id: string;
	firstName: string;
	createdAt: Date;
	updatedAt: Date;
	lastName: string;

	constructor(){
		super(...arguments);
		let klass = this.constructor as any;
		this.hasMany(Login, {
			columnName: 'user_id',
			tableName: 'doesnt work'
		});
	}
}
