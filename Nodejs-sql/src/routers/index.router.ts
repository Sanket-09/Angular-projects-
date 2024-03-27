import express from 'express';
import { userRouter } from '../modules/user/user.router';

export class baseRouterClass {

    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    public config(): void {
        this.router.use("/user", userRouter);
        
    }
}

export const baseRouter = new baseRouterClass().router;