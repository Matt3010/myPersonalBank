import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule, HeaderModule, InputModule, ModalModule, SelectModule, SliderModule, TableModule, TooltipModule } from "carbon-components-angular";
import { DoTransactionFormComponent } from './components/do-transaction-form/do-transaction-form.component';
import { ImgAccountComponent } from './components/img-account/img-account.component';
import { MyIbanComponent } from './components/my-iban/my-iban.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PaginatorRicercaMovimenti1Component } from './components/paginator-ricerca-movimenti/paginator-ricerca-movimenti.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ProfileComponent } from './pages/profile/profile.component';

import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DateRangeComponent } from './components/do-transaction-form/date-range/date-range.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { GeneralRicercaComponent } from './pages/ricerca-general/general-ricerca.component';
import { RicercaMovimenti3Component } from './pages/ricerca-movimenti3/ricerca-movimenti3.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarModule } from 'ng-sidebar';


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
    ProfileComponent,
    MyIbanComponent,
    PaginatorRicercaMovimenti1Component,
    DoTransactionFormComponent,
    LineChartComponent,
    GeneralRicercaComponent,
    RicercaMovimenti3Component,
    DateRangeComponent,
    SidebarComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    FormsModule,
    SelectModule,
    ModalModule,
    HeaderModule,
    TooltipModule,
    TableModule,
    InputModule,
    SliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSliderModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    SidebarModule.forRoot()


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
