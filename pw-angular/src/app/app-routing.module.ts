import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PaginatorRicercaMovimenti1Component } from './components/paginator-ricerca-movimenti/paginator-ricerca-movimenti.component';
import { RicercaMovimenti1Component } from './pages/ricerca-movimenti1/ricerca-movimenti1.component';
import { RicercaMovimenti2Component } from './pages/ricerca-movimenti2/ricerca-movimenti2.component';
import { GeneralRicercaComponent } from './pages/ricerca-general/general-ricerca.component';

const routes: Routes = [
  {path:"", redirectTo:"profile", pathMatch:"full"},
  {path:"login", component: LoginComponent },
  {path:"home", component: HomeComponent, canActivate:[authGuard] },
  {path:"registration", component: RegistrationComponent },
  {path: "bankAccounts/transactions", component: GeneralRicercaComponent},
  {path:"profile", component: ProfileComponent, canActivate:[authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
