import Sequelize, { Model } from 'sequelize'

import Database from '../database'
import User from './User'
import Autist from './Autist'

const sequelize = Database.connect()

class Activity extends Model {
  public id?: number;
  public title?: string;
  public description?: string;
  public start?: Date;
  public end?: Date;
  public repeat?: number;
  public repeatEvery?: string;
  public repeatOn?: string;
}
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
  modelName: 'activities'
})

Autist.hasMany(Activity)
User.hasMany(Activity, {
  foreignKey: 'createdBy'
})
User.hasMany(Activity, {
  foreignKey: 'updatedBy'
})

export default Activity
