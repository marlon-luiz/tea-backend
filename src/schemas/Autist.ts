import Sequelize, { Model } from 'sequelize'

import Database from '../database'
import User from './User'

const sequelize = Database.connect()

class Autist extends Model {}
Autist.init({
  name: {
    type: Sequelize.STRING(200),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'autists',
  underscored: true
})

User.hasOne(Autist, {
  foreignKey: {
    name: 'responsible_id',
    allowNull: false
  }
})
User.hasMany(Autist, {
  foreignKey: 'created_by'
})
User.hasMany(Autist, {
  foreignKey: 'updated_by'
})

export default Autist
