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
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O nome do autista é obrigatório.'
      },
      notEmpty: {
        msg: 'O nome do autista é obrigatório.'
      },
      len: {
        args: [0, 200],
        msg: 'O nome do autista deve conter no máximo 200 caracteres.'
      }
    }
  }
}, {
  sequelize,
  modelName: 'autists',
  validate: {
    async responsible (): Promise<void> {
      const responsibleId = this.responsibleId as number
      const responsible = await User.findByPk(responsibleId)

      if (responsible === null) {
        throw new Error('Não foi possível encontrar o usuário criador.')
      }
    },
    async creator (): Promise<void> {
      const createdBy = this.createdBy as number
      const creator = await User.findByPk(createdBy)

      if (this.isNewRecord && creator === null) {
        throw new Error('Não foi possível encontrar o usuário criador.')
      }
    },
    async updater (): Promise<void> {
      const updatedBy = this.updatedBy as number
      const updater = await User.findByPk(updatedBy)

      if (updater === null) {
        throw new Error('Não foi possível encontrar o usuário atualizador.')
      }
    }
  }
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
