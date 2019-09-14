import Sequelize, { Model } from 'sequelize'

import Database from '../database'

const sequelize = Database.connect()

class User extends Model {}

User.init({
  email: {
    type: Sequelize.STRING(200),
    allowNull: false
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
