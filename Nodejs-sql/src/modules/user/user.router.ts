import * as express from "express";
import { userController } from "./controller/user.controller";

export class userRouterClass {

    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get("/", userController.getUsers);
        this.router.post("/:id", userController.getUserById);
    }
}

export const userRouter = new userRouterClass().router;