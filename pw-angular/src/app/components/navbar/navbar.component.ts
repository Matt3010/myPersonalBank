import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { pages } from 'pages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  list: any;

  ngOnInit(): void {
    this.list = pages
  }

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
  goToProfile(){
    this.route.navigateByUrl("profile")
  }

  currentUser$ = this.authSrv.currentUser$

}
