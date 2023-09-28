import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { GeneralRicercaComponent } from './pages/ricerca-general/general-ricerca.component';
import { LoadingComponent } from './pages/loading/loading.component';

const routes: Routes = [
  {path:"", redirectTo:"profile", pathMatch:"full"},
  {path:"login", component: LoginComponent },
  {path:"home", component: HomeComponent, canActivate:[authGuard] },
  {path:"registration", component: RegistrationComponent },
  {path: "bankAccounts/transactions", component: GeneralRicercaComponent, canActivate:[authGuard]},
  {path:"profile", component: ProfileComponent, canActivate:[authGuard] },
  {path:"loading", component: LoadingComponent, canActivate:[authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
