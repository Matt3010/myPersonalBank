import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [

  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login", component:LoginComponent },
  {path:"home", component:HomeComponent,  /* canActivate:[authGuard] */},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
