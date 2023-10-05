import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit  {
  list: any;
  currentRoute: string | null = null

  constructor(private route: Router, private authSrv: AuthService)  {}

  currentUser$ = this.authSrv.currentUser$
  url! : string

  ngOnInit(): void {
       this.url = this.route.url

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


}
