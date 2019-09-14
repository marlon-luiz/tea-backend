import { Sequelize } from 'sequelize'

export default class Database {
  private static sequelize: Sequelize = null

  static connect (): Sequelize {
    if (this.sequelize === null) {
      this.sequelize = new Sequelize('postgres://postgres:m19980130@localhost:5432/tea')

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
