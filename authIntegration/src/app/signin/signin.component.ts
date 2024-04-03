import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  loginForm: FormGroup
  errors = { email: '', password: '' }

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.http
        .post('/login', this.loginForm.value, {
          headers: { 'Content-Type': 'application/json' },
        })
        .subscribe({
          next: (data: any) => {
            console.log(data)
            if (data.errors) {
              this.errors.email = data.errors.email
              this.errors.password = data.errors.password
            }
            if (data.user) {
              // Navigate to home or dashboard
            }
          },
          error: (error) => console.error(error),
        })
    }
  }
}
