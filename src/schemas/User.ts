import Sequelize, { Model } from 'sequelize'

import Database from '../database'

const sequelize = Database.connect()

class User extends Model {
  public id?: number;
  public email?: string;
  public password?: string;
  public name?: string;
  public type?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

User.init({
  email: {
    type: Sequelize.STRING(200),
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'O e-mail do usuário é obrigatório.'
      },
      notEmpty: {
        msg: 'O e-mail do usuário é obrigatório.'
      },
      isEmail: {
        msg: 'O e-mail do usuário não e válido.'
      },
      len: {
        args: [0, 200],
        msg: 'O e-mail do usuário deve conter no máximo 200 caracteres.'
      }
    }
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'A senha do usuário é obrigatória.'
      },
      notEmpty: {
        msg: 'A senha do usuário é obrigatória.'
      },
      len: {
        args: [0, 100],
        msg: 'A senha do usuário deve conter no máximo 100 caracteres.'
      }
    }
  },
  name: {
    type: Sequelize.STRING(200),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O nome do usuário é obrigatório.'
      },
      notEmpty: {
        msg: 'O nome do usuário é obrigatório.'
      },
      len: {
        args: [0, 200],
        msg: 'O nome do usuário deve conter no máximo 200 caracteres.'
      }
    }
  },
  type: {
    type: Sequelize.STRING(1),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'O tipo de usuário é obrigatório.'
      },
      notEmpty: {
        msg: 'O tipo de usuário é obrigatório.'
      },
      isIn: {
        args: [['A', 'C']],
        msg: 'Tipo desconhecido de usuário.'
      }
    }
  }
}, {
  sequelize,
  modelName: 'users',
  validate: {
    async existingEmail (): Promise<void> {
      const email = this.email as string
      const user = await User.findOne({
        where: { email }
      })

      if (this.isNewRecord && user !== null) {
        throw new Error('Já existe um usuário com este e-mail cadastrado.')
      }
    }
  }
})

export default User
