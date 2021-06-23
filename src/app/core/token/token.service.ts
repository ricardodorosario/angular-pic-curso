import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  hasToken() {
    return !!this.getToken();
  }
  setToken(token: string) {
    sessionStorage.setItem(KEY, token);
  }
  getToken(): string {
    return sessionStorage.getItem(KEY) || '';
  }
  removeToken() {
    sessionStorage.removeItem(KEY);
  }
}
