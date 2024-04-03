import * as express from 'express'
import { userController } from './controller/user.controller'

export class userRouterClass {
  public router: express.Router = express.Router()

  constructor() {
    this.config()
  }

  private config(): void {
    this.router.get('/', userController.getUsers)
    this.router.post('/', userController.postUsers)
    this.router.get('/:id', userController.getUserById)
    this.router.delete('/:id', userController.deleteUserById)
  }
}

export const userRouter = new userRouterClass().router
