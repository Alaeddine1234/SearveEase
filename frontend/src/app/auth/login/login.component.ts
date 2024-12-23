import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  userData: any;
  username: any;
  role: any;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  credentials = {
    email: '',
    password: ''
  };

  onLogin() {
    // Ensure form is valid before attempting login
    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe(
      response => {
        console.log('Login successful', response);
        const token = response.token;
        localStorage.setItem('token', token);

        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          this.userData = JSON.parse(jsonPayload);
          console.log("userData: ", this.userData)
          this.role = this.userData.user.role;  // Assuming 'role' is present in the token payload
          console.log(this.role)

          // Redirect based on role
          switch (this.role) {
            case 'client':
              this.router.navigate(['/client-dashboard']);
              break;
            case 'waiter':
              this.router.navigate(['/waiter-dashboard']);
              break;
            case 'admin':
              this.router.navigate(['/admin-dashboard']);
              break;
            default:
              // Handle unrecognized role (e.g., redirect to home)
              this.router.navigate(['/home']);
              break;
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          // Handle token decoding error (e.g., invalid token format)
        }
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
