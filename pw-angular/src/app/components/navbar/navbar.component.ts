import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {


  @Output() emitLogout = new EventEmitter<void>()

  constructor(private route: Router, private authSrv: AuthService)  {}

  goToLogin(){
      this.route.navigateByUrl("login")
  }
  goToHome(){
      this.route.navigateByUrl("home")
  }
  doLogOut(){
    this.emitLogout.emit()
  }
  goToRicercaMovimenti2(){
    this.route.navigateByUrl("research/movements/2")
  }
  goToProfile(){
    this.route.navigateByUrl("profile")
  }

  currentUser$ = this.authSrv.currentUser$

}
