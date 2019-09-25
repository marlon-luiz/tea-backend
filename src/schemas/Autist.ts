import Sequelize, { Model } from 'sequelize'

import Database from '../database'
import User from './User'

const sequelize = Database.connect()

class Autist extends Model {
  id?: number;
  name?: string;
  responsibleId?: number;
  createdAt?: Date;
  createdBy?: number;
  updatedAt?: Date;
  updatedBy?: number;
}
Autist.init({
  name: {
    type: Sequelize.STRING(200),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'autists'
})

User.hasOne(Autist, {
  foreignKey: {
    name: 'responsibleId',
    allowNull: false
  }
})
User.hasMany(Autist, {
  foreignKey: 'createdBy'
})
User.hasMany(Autist, {
  foreignKey: 'updatedBy'
})

export default Autist
