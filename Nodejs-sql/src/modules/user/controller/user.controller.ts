import { userRepository } from "../repository/user.repository";

class userControllerClass {
    constructor() { }

    public getUsers(req:any, res:any): void {
        userRepository.getUsers().then((data:any) => {
            res.send(data);
        }).catch((error:any) => {
            res.send(error);
        });
    }

    public getUserById(req:any, res:any): void {
        let id = req.params.id;
        userRepository.getUserById(id).then(data => {
            res.send(data)
        }).catch(err => {
            res.send(err)
        })
    }
}

export const userController = new userControllerClass();