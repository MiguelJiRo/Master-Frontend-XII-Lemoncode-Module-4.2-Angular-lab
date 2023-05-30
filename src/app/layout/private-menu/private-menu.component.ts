import { Component, Input } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-menu',
  templateUrl: './private-menu.component.html',
  styleUrls: ['./private-menu.component.scss']
})
export class PrivateMenuComponent {

  @Input() title: string = '';

  constructor(private router: Router, private authService: AuthService, private globalService: GlobalService) {

  }

  submit() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
