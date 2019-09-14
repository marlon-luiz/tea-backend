import Sequelize, { Model } from 'sequelize'

import Database from '../database'

const sequelize = Database.connect()

class User extends Model {
  public id: number;
  public email: string;
  public password: string;
  public name: string;
  public type: string;
  public createdAt: Date;
  public updatedAt: Date;
}

User.init({
  email: {
    type: Sequelize.STRING(200),
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(200),
    allowNull: false
  },
  type: {
    type: Sequelize.STRING(1),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'users',
  underscored: true
})

export default User
