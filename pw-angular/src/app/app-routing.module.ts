import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { RicercaMovimenti2Component } from './pages/ricerca-movimenti2/ricerca-movimenti2.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PaginatorRicercaMovimenti1Component } from './components/paginator-ricerca-movimenti/paginator-ricerca-movimenti.component';
import { RicercaMovimenti1Component } from './pages/ricerca-movimenti1/ricerca-movimenti1.component';

const routes: Routes = [
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"login", component: LoginComponent },
  {path:"home", component: HomeComponent, canActivate:[authGuard] },
  {path:"registration", component: RegistrationComponent },

  {path: "research/movements", children:[

    {path:"1", component: RicercaMovimenti1Component , canActivate:[authGuard]},
    {path:"2", component: RicercaMovimenti2Component , canActivate:[authGuard]},

  ]},

  {path:"profile", component: ProfileComponent, canActivate:[authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
