import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  authenticate(username: string, password: string) {
    return this.http
      .post(
        API + 'user/login',
        {
          userName: username,
          password,
        },
        { observe: 'response' }
      )
      .pipe(
        tap((res) => {
          const authToken: string = res.headers.get('x-access-token') || '';
          this.userService.setToken(authToken);
        })
      );
  }
}
