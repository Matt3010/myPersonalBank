import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ImgAccountComponent } from './components/img-account/img-account.component';
import { RicercaMovimenti2Component } from './pages/ricerca-movimenti2/ricerca-movimenti2.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PaginatorRicercaMovimenti2Component } from './components/paginator-ricerca-movimenti2/paginator-ricerca-movimenti2.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MyIbanComponent } from './components/my-iban/my-iban.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PaginatorRicercaMovimenti1Component } from './components/paginator-ricerca-movimenti1/paginator-ricerca-movimenti1.component';
import { RicercaMovimenti1Component } from './pages/ricerca-movimenti1/ricerca-movimenti1.component';
import { DoTransactionFormComponent } from './components/do-transaction-form/do-transaction-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    LoginFormComponent,
    HomeComponent,
    NavbarComponent,
    ImgAccountComponent,
    RegistrationFormComponent,
    RicercaMovimenti2Component,
    ProfileComponent,
    PaginatorRicercaMovimenti2Component,
    MyIbanComponent,
    PaginatorRicercaMovimenti1Component,
    RicercaMovimenti1Component,
    DoTransactionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatPaginatorModule,
    Ng2SmartTableModule,

  ],
providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
