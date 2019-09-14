import express from 'express'
import cors from 'cors'

import Database from './database'
import routes from './routes'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database (): void {
    Database.connect()
  }

  private routes (): void {
    this.express.get('/', (req, res) => {
      return res.json({
        message: 'Hello World!'
      })
    })

    this.express.use(routes)
  }
}

export default new App().express
