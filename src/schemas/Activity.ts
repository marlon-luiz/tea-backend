import Sequelize, { Model } from 'sequelize'

import Database from '../database'
import User from './User'
import Autist from './Autist'

const sequelize = Database.connect()

class Activity extends Model {}
Activity.init({
  title: {
    type: Sequelize.STRING(200),
    allowNull: false
  },
  description: Sequelize.TEXT,
  start: {
    type: Sequelize.DATE,
    allowNull: false
  },
  end: {
    type: Sequelize.DATE,
    allowNull: false
  },
  repeat: Sequelize.INTEGER,
  repeatEvery: Sequelize.STRING(5),
  repeatOn: Sequelize.STRING(7)
}, {
  sequelize,
  modelName: 'activities',
  underscored: true
})

Autist.hasMany(Activity)
User.hasMany(Autist, {
  foreignKey: 'created_by'
})
User.hasMany(Autist, {
  foreignKey: 'updated_by'
})

export default Activity
