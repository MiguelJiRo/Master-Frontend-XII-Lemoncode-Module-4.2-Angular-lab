import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  isLogin: boolean;
  titleUser: string = '';

  constructor(private authService: AuthService, private globalService: GlobalService) {
    this.isLogin = false;
  }

  ngOnInit(): void {
    this.globalService.getLogStatus$().subscribe(
      e => {
        if (e) {
          this.isLogin = true;
          this.titleUser = this.authService.getUsername();
        }
        else {
          this.isLogin = false;
        }
      }
    )
  }
}
