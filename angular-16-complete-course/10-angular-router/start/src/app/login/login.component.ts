import {
  Component,
  ElementRef,
  ViewChild,
  inject
} from '@angular/core';
import {
  Authservice
} from '../Services/auth.services';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  authservice: Authservice = inject(Authservice);
  router: Router = inject(Router)
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((queryParameter) => {
      const logout = Boolean(queryParameter.get('logout'));

      if (logout) {
        this.authservice.logout();
        alert("You are now logged out = " + this.authservice.isLoggedIn)
      }
    })
  }

  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  onLogin() {

    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;

    const user = this.authservice.login(username, password);

    if (user === undefined)
      alert("Login credentials are not correct");

    else {
      alert("Welcome " + user.name + " .You are now logged In");
      this.router.navigate(['/courses']);
    }

  }

}