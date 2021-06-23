import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerLog } from './server-log';
import { environment } from 'src/environments/environment';

const API = environment.ApiLogUrl;

@Injectable({ providedIn: 'root' })
export class ServerLogService {
  constructor(private httpClient: HttpClient) {}
  log(log: ServerLog) {
    return this.httpClient.post(API + 'infra/log', log);
  }
}
