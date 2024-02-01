import { Injectable, inject } from "@angular/core";
import { UserService } from "./user.service";
import { User } from "../Models/user";

@Injectable ({
    providedIn: 'root'
})

export class Authservice{
    isLoggedIn : boolean = false;
    userService : UserService = inject(UserService);
    

    login(username: string, password: string)
    {   
        console.log(this.userService.users)
        let user = this.userService.users.find((u) =>
            u.username === username && u.password === password
        );  

        if(user === undefined)
        this.isLoggedIn = false;

        else
        this.isLoggedIn = true;

        console.log(user);
        return user;
        
    }

    logout()
    {
        this.isLoggedIn = false;
    }

    isAuthenticated(){
        return this.isLoggedIn;
    }
    
}