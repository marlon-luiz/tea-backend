import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import logger from './logger'

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

    this.express.use((req: Request, res: Response, next: NextFunction) => {
      logger.debug(req.method)

      next()
    })
    this.express.use(routes)

    // Error Handler
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.express.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(500).json({ error: err.message })

      next()
    })
  }
}

export default new App().express
