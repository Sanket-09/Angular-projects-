import { Injectable , inject} from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Resolve, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Authservice } from "./auth.services";
import { ContactComponent } from "../contact/contact.component";
import { Course } from "../Models/course";
import { CourseService } from "./course.service";

@Injectable({
    providedIn : 'root',
})

 

export class AuthGuardService implements CanActivate, CanDeactivate<ContactComponent> , Resolve<Course[]>{

    authservice: Authservice = inject(Authservice);
    router : Router = inject(Router);
    courseService : CourseService = inject(CourseService);

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

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Course[] {
        var courseList = [];
        this.courseService.getAllcourses().subscribe((data)=>{
            courseList = data;
        });

        return courseList;
    }

}