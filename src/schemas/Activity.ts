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
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O título da atividade é obrigatório.'
      },
      notEmpty: {
        msg: 'O título da atividade é obrigatório.'
      },
      len: {
        args: [0, 200],
        msg: 'O título da atividade deve conter no máximo 200 caracteres.'
      }
    }
  },
  description: Sequelize.TEXT,
  start: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'A data inicial da atividade é obrigatória.'
      },
      notEmpty: {
        msg: 'A data inicial da atividade é obrigatória.'
      }
    }
  },
  end: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'A data final da atividade é obrigatória.'
      },
      notEmpty: {
        msg: 'A data final da atividade é obrigatória.'
      }
    }
  },
  repeat: Sequelize.INTEGER,
  repeatEvery: Sequelize.STRING(5),
  repeatOn: Sequelize.STRING(7)
}, {
  sequelize,
  modelName: 'activities',
  validate: {
    validateStartEnd (): void {
      const start = this.start as Date
      const end = this.end as Date

      if (start > end) {
        throw new Error('A data inicial da atividade não pode ser posterior à final.')
      }
    },
    async autist (): Promise<void> {
      const autistId = this.autistId as number
      const autist = await User.findByPk(autistId)

      if (autist === null) {
        throw new Error('Não foi possível encontrar o autista.')
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

Autist.hasMany(Activity)
User.hasMany(Activity, {
  foreignKey: 'createdBy'
})
User.hasMany(Activity, {
  foreignKey: 'updatedBy'
})

export default Activity
