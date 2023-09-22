import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

    currentUser: User | null = null

    constructor(private authService: AuthService){
      this.authService.currentUser$.subscribe(res=>{
        console.log(res)
      })
    }

    currentUser$ = this.authService.currentUser$

  }
