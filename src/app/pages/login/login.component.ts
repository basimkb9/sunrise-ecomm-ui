import { Component } from '@angular/core';
import { AuthserviceService } from '../../service/authservice.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MessagesModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Use styleUrls instead of styleUrl
})
export class LoginComponent {
  loginForm: FormGroup;
  AUTH_URL: string = 'http://localhost:8080/api/auth/authenticate';
  errorMsg: string = '';
  errorMsg

  constructor(private authService: AuthserviceService) {
    this.loginForm = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    })
  }

  //to authenticate a login attempt
  authenticate(): void {
    this
      .authService
      .authenticate(this.AUTH_URL, this.loginForm)
      .subscribe({
        next: this.handleUpdateResponse.bind(this),
        error: this.handleError.bind(this)
      });
  }

  handleUpdateResponse(response: any): void {
    console.log('Response:', response);
  }

  handleError(error: HttpErrorResponse): void {
    if(error.status == 403){
      this.errorMsg = 'Invalid Email/Password';
    }
    else{
      this.errorMsg = 'Something went wrong within the Server, please try again later';
    }
  }
}
