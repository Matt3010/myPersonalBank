import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  currentUser$ = this.AuthSrv.currentUser$

  constructor(private AuthSrv: AuthService){
  }

  doLogOut(){
    this.AuthSrv.logout()
  }

}
