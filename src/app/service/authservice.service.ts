import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginUser } from '../pages/login/loginUser.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  userInfo: LoginUser | undefined;

  constructor(private http: HttpClient) { }

  authenticate(url: string, userData: FormGroup): Observable<any> {
    const userBody = userData.value;
    return this.http.post(url, userBody);
  }
}

// https://www.youtube.com/watch?v=-PW9fwNhrE4&ab_channel=ISSBPREPARATION-withZAM