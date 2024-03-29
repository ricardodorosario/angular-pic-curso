import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/user/user';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(private userService: UserService, private router: Router) {
    console.log('OK: ', userService);
    this.user$ = this.userService.getUser();
  }

  ngOnInit(): void {}

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }
}
