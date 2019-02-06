import Schema from '../../src/schema';
import connection from '../../src/connection';
import User from './models/user';
import Login from './models/login';
import knex from 'knex';
let migrationConnection;
describe('When using defaults', () => {
  beforeEach( async () => {
    let config =
    {
       client: 'postgresql',
       connection: 'postgres://localhost/nxlevel',
    }
    connection.configure(config);
    migrationConnection = knex(config);
    await migrationConnection.migrate.latest();
    await migrationConnection.seed.run();
    await Schema.load()
  });

  afterEach( async () => {
    await migrationConnection.migrate.rollback()
    await connection.destroy();
    await migrationConnection.destroy();
  });

  it('Find basic discovers user', async () => {
  let u = await User.find(1);
    User.find(1)
    expect(u.firstName).toEqual('seb')
    expect(u.id).toEqual("1")
    u = await User.find(2);
    expect(u.firstName).toEqual('mo')
    expect(u.id).toEqual("2")
  });

  it('Can create a new user', async () => {
    let user = new User()
    user.firstName = 'That other guy';
    user.lastName = 'hello'
    await user.save();
    expect(user.id).toEqual("4");
    expect(user.createdAt).not.toBeNull();
    expect(user.updatedAt).not.toBeNull()
  });

  it('Can update a user', async () => {
    let user = await User.find(1);

    user.firstName = 'updated name';
    let createdAt = user.createdAt;
    let updatedAt = user.updatedAt;
    await user.save();

    expect(user.id).toEqual("1");
    expect(user.firstName).toEqual('updated name');
    user = await User.find(1);
    expect(user.firstName).toEqual('updated name');
  });


  it('Can find user through login belongs to user', async () => {
    let login = await Login.find(1);
    let user = await login.user;
    expect(user.firstName).toEqual('seb');
  });

  it('Can find logins through user has many', async () => {
    let user = await User.find(1);
    let logins = await user.logins;
    let nicks = logins.map((login) => {
      return login.nick
    });
    expect(nicks).toEqual([ 'sebby', 'debby', 'lebby' ]);
  });

  it('Can filter logins has many relationship', async () => {
    let user = await User.find(1);
    let logins = await user.logins.where({nick: 'sebby'});
    let nicks = logins.map((login) => {
      return login.nick
    });
    expect(nicks).toEqual([ 'sebby' ]);
  });
});
