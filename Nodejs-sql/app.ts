import bodyParser from 'body-parser'

import express from 'express'
import { PrismaClient } from '@prisma/client'
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
import { dbUtility } from './src/utility/database'
import { baseRouter } from './src/routers/index.router'

class AppClass {
  public app: express.Application //app will be an instance of an Express application.
  private prisma: PrismaClient = new PrismaClient()

  constructor() {
    this.app = express()
    this._init()
  }

  _init() {
    //configuring dotenv to load the environment variables from the dev.env file located in the ./env/ directory.

    this.app.use(bodyParser.json({ limit: '50mb' }))

    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
    /* adds another body-parser middleware to parse URL-encoded bodies (like the ones from HTML forms), with a limit of 50mb. 
    The extended: false option means that the URL-encoded data will be parsed with the querystring library. */

    // dbUtility.connect()
    this.app.use('/api/v1', baseRouter) //base path

    //Not Found Routers
    this.app.use((req, res, next) => {
      res
        .status(404)
        .json({ message: 'The Requested URL was not found on this server.' })
    })

    this.app.listen(process.env.SERVER_PORT, () => {
      console.log('Express server listening on port', process.env.SERVER_PORT)
    })
  }
}

export default new AppClass().app
