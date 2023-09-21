import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { RicercaMovimenti2Component } from './pages/ricerca-movimenti2/ricerca-movimenti2.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login", component: LoginComponent },
  {path:"home", component: HomeComponent, canActivate:[authGuard] },
  {path:"registration", component: RegistrationComponent },
  {path:"research/movements/2", component: RicercaMovimenti2Component , canActivate:[authGuard]},
  {path:"profile", component: ProfileComponent, canActivate:[authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
