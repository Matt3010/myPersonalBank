import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private route: Router, private authSrv: AuthService) {

  }

  goToLogin(){
      this.route.navigateByUrl("login")
  }
  goToHome(){
      this.route.navigateByUrl("home")
  }

  currentUser$ = this.authSrv.currentUser$

}
