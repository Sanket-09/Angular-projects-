import bodyParser from 'body-parser'
import express from 'express'
import * as dotenv from 'dotenv'
import { dbUtility } from './utility/database'
import { baseRouter } from './routers/index.router'

class AppClass {
  public app: express.Application

  constructor() {
    this.app = express()
    this._init()
  }

  _init() {
    dotenv.config({ path: './env/' + 'dev.env' })

    this.app.use(bodyParser.json({ limit: '50mb' }))

    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

    // dbUtility.connect()
    this.app.use('/api/v1', baseRouter)

    //Not Found Routers
    this.app.use((req, res, next) => {
      res
        .status(404)
        .send({ message: 'The Requested URL was not found on this server.' })
    })

    this.app.listen(process.env.PORT, () => {
      console.log('Express server listening on port ' + process.env.PORT)
    })
  }
}

export default new AppClass().app
