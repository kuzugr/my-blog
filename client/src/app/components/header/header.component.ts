import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title = environment.title;
  loginState: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loginState = false;
    this.getLoginState();
  }

  getLoginState() {
    this.authService.loginState().then(
      (response) => {
        this.loginState = response['login_state'];
      },
      (error) => {},
    );
  }
}
