import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  list: any;
  currentRoute: string | null = null

    constructor(private route: Router, private authSrv: AuthService)  {}


  ngOnInit(): void {
    //this.currentRoute = this.route.url
    //this.list = pages.getPagesByRoute(this.currentRoute)
  }

  @Output() emitLogout = new EventEmitter<void>()


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
