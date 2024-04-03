import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  errors = { email: '', password: '' }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.http
        .post('/signup', this.signupForm.value, {
          headers: { 'Content-Type': 'application/json' },
        })
        .subscribe({
          next: (data: any) => {
            console.log(data)
            if (data.errors) {
              this.errors.email = data.errors.email
              this.errors.password = data.errors.password
            } else if (data.userPromise) {
              window.location.assign('/')
            }
          },
          error: (e) => console.error(e),
        })
    }
  }

  signupForm: FormGroup

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit(): void {}
}
