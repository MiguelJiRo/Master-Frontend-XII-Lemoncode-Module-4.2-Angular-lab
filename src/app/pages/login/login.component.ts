import { Component } from '@angular/core';
import { UserCredentials, AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  member: UserCredentials = {
    username: '',
    password: ''
  };

  title: string = 'Login';
  errorLogin: boolean = false;
  error: string = 'Username or password invalid'
  errorUser: string = 'master@lemoncode.net';
  errorPassword: string = '12345678';
  spinnerOn: boolean = false;

  constructor(private router: Router, private globalService: GlobalService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.globalService.getLogStatus$().subscribe(
      e => {
        if (!e) {
          this.error = this.authService.getLastLoginErrorMessage();
        }
        else {
          this.router.navigate(['/dashboard']);
        }
      }
    )
  }

  submit() {
    this.spinnerOn = true;
    this.authService.login(this.member).subscribe(
      e => {
        this.spinnerOn = false;
        if (!e) {
          this.errorLogin = true;
        }
        else {
          this.errorLogin = false;
          this.globalService.setLogStatus(true);
        }
      }
    );
  }

}
