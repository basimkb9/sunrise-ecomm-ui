import { Component } from '@angular/core';
import { AuthserviceService } from '../../service/authservice.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MessagesModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Use styleUrls instead of styleUrl
})
export class LoginComponent {
  loginForm: FormGroup;
  AUTH_URL: string = 'http://localhost:8080/api/auth/authenticate';
  wrongCredentialsMsg: string = '';
  failedRequestMsg: string = '';
  

  constructor(private authService: AuthserviceService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    })
  }

  //to authenticate a login attempt
  authenticate(): void {
    this.authService.authenticate(this.AUTH_URL, this.loginForm)
      .subscribe({
        next: this.redirectUser.bind(this),
        error: (error: HttpErrorResponse) => {
            this.handleError(error);
        }
      });
  }

  redirectUser(response: any): void {
    console.log('Response: ', response);
    
    this.router.navigateByUrl('/home');
  }

  handleError(error: HttpErrorResponse): void {
    if (error.status === 403) {
      console.error('Forbidden error occurred:', error);
      this.wrongCredentialsMsg = 'Invalid email/password';
    } else {
      this.failedRequestMsg = 'There\'s a problem with the request, please try again';
    }
  }
}
