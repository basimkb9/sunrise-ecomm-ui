import { Component } from '@angular/core';
import { AuthserviceService } from '../../service/authservice.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  standalone:  true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Use styleUrls instead of styleUrl
})
export class LoginComponent {
  loginForm: FormGroup; 

  constructor(private authService: AuthserviceService) { 
    this.loginForm = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    })
  }

  AUTH_URL: string = 'http://localhost:8080/api/auth/authenticate'; 

  authenticate(): void {
    this.authService.authenticate(this.AUTH_URL, this.loginForm).subscribe({
      next: this.handleUpdateResponse.bind(this), 
      error: this.handleError.bind(this)
    });
  }

  handleUpdateResponse(response: any): void {
    console.log('Response:', response);
  }

  handleError(error: any): void {
    console.error('Error:', error);
  }
}
