import { Sequelize, Options } from 'sequelize'

export default class Database {
  private static sequelize: Sequelize

  static connect (): Sequelize {
    if (!this.sequelize) {
      const {
        DB_USER:user = '',
        DB_PASS:pass = '',
        DB_HOST:host = '',
        DB_PORT:port,
        DB_NAME:database = '',
        DB_SSL:ssl
      } = process.env

      const options: Options = {
        host,
        port: Number(port),
        dialect : 'postgres',
        dialectOptions: {
          ssl: ssl !== 'false'
        }
      }

      this.sequelize = new Sequelize(database, user, pass, options)

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
