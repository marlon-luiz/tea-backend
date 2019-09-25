import { Sequelize, Options } from 'sequelize'

export default class Database {
  private static sequelize: Sequelize

  static connect (): Sequelize {
    if (!this.sequelize) {
      const uri: string = process.env.DB_HOST || ''
      const options: Options = {
        dialectOptions: {
          ssl: process.env.DB_SSL !== 'false'
        }
      }

      this.sequelize = new Sequelize(uri, options)

      // this.sequelize
      //   .authenticate()
      //   .then(() => {
      //     console.log('Conexão realizada com sucesso!')
      //   })
      //   .catch(error => {
      //     console.log(`Falha ao realizar a conexão: ${error}`)
      //   })
    }

    return this.sequelize
  }
}
