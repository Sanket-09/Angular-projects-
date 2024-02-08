import { Injectable , inject} from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Authservice } from "./auth.services";
import { ContactComponent } from "../contact/contact.component";

@Injectable({
    providedIn : 'root',
})

 

export class AuthGuardService implements CanActivate, CanDeactivate<ContactComponent>{

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

    canDeactivate(component: ContactComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) {
        return component.canExit();
    }


}