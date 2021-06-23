import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { environment } from 'src/environments/environment';
import * as Stacktrace from 'stacktrace-js';
import { ServerLogService } from './server-log.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    //injeção dentro do método
    const location = this.injector.get(LocationStrategy);
    const userService = this.injector.get(UserService);
    const serveLogService = this.injector.get(ServerLogService);
    const router = this.injector.get(Router);
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const message = error.message ? error.message : error.toString();

    console.log('Global Error Handler');

    if (environment.production) {
      router.navigate(['/error']);
    }

    Stacktrace.fromError(error).then((stackFrames) => {
      const stackAsString = stackFrames
        .map((stackFrame) => {
          return stackFrame.toString();
        })
        .join('\n');
      console.log(message);
      console.log(stackAsString);
      serveLogService
        .log({
          message,
          url,
          userName: userService.getUserName(),
          stack: stackAsString,
        })
        .subscribe(
          () => {
            console.log('Error logged on server');
          },
          (err) => {
            console.log('Fail to send log to server: ', err);
          }
        );
    });
  }
}
