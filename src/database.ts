import { Sequelize, Options } from 'sequelize'

export default class Database {
  private static sequelize: Sequelize

  static connect (): Sequelize {
    if (!this.sequelize) {
      const {
        DB_USER: user = '',
        DB_PASS: pass = '',
        DB_HOST: host = '',
        DB_PORT: port,
        DB_NAME: database = '',
        DB_SSL: ssl
      } = process.env

      const options: Options = {
        host,
        port: Number(port),
        dialect: 'postgres',
        dialectOptions: {
          ssl: ssl !== 'false'
        }
        // operatorsAliases: {
        //   $eq: Op.eq,
        //   $ne: Op.ne,
        //   $gte: Op.gte,
        //   $gt: Op.gt,
        //   $lte: Op.lte,
        //   $lt: Op.lt,
        //   $not: Op.not,
        //   $in: Op.in,
        //   $notIn: Op.notIn,
        //   $is: Op.is,
        //   $like: Op.like,
        //   $notLike: Op.notLike,
        //   $iLike: Op.iLike,
        //   $notILike: Op.notILike,
        //   $regexp: Op.regexp,
        //   $notRegexp: Op.notRegexp,
        //   $iRegexp: Op.iRegexp,
        //   $notIRegexp: Op.notIRegexp,
        //   $between: Op.between,
        //   $notBetween: Op.notBetween,
        //   $overlap: Op.overlap,
        //   $contains: Op.contains,
        //   $contained: Op.contained,
        //   $adjacent: Op.adjacent,
        //   $strictLeft: Op.strictLeft,
        //   $strictRight: Op.strictRight,
        //   $noExtendRight: Op.noExtendRight,
        //   $noExtendLeft: Op.noExtendLeft,
        //   $and: Op.and,
        //   $or: Op.or,
        //   $any: Op.any,
        //   $all: Op.all,
        //   $values: Op.values,
        //   $col: Op.col
        // }
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
