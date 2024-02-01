import { Injectable , inject} from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Authservice } from "./auth.services";

@Injectable({
    providedIn : 'root',
})

 

export class AuthGuardService implements CanActivate{

    authservice: Authservice = inject(Authservice);
    router : Router = inject(Router);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean> |  Promise<boolean> 
    {
        if(this.authservice.isAuthenticated())
        {
            return true;
        }

        else
        {
            
            alert("You are not authorised to checkout, Pleaes sign in first")
            this.router.navigate(['/login'])
            return false;

        }
    }


}