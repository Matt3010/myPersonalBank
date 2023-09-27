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
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ImgAccountComponent } from './components/img-account/img-account.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyIbanComponent } from './components/my-iban/my-iban.component';
import { PaginatorRicercaMovimenti1Component } from './components/paginator-ricerca-movimenti/paginator-ricerca-movimenti.component';
import { RicercaMovimenti1Component } from './pages/ricerca-movimenti1/ricerca-movimenti1.component';
import { DoTransactionFormComponent } from './components/do-transaction-form/do-transaction-form.component';
import { ButtonModule, HeaderModule, InputModule, ModalModule, NumberModule, SelectModule, SideNav, SliderModule, Table, TableModule, TooltipModule } from "carbon-components-angular";
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import {MatSliderModule} from '@angular/material/slider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GeneralRicercaComponent } from './pages/ricerca-general/general-ricerca.component';
import { RicercaMovimenti2Component } from './pages/ricerca-movimenti2/ricerca-movimenti2.component';
import { RicercaMovimenti3Component } from './pages/ricerca-movimenti3/ricerca-movimenti3.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateRangeComponent } from './components/do-transaction-form/date-range/date-range.component';
import { MatNativeDateModule } from '@angular/material/core';


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
    RicercaMovimenti1Component,
    RicercaMovimenti2Component,
    ProfileComponent,
    MyIbanComponent,
    PaginatorRicercaMovimenti1Component,
    RicercaMovimenti1Component,
    DoTransactionFormComponent,
    LineChartComponent,
    GeneralRicercaComponent,
    RicercaMovimenti3Component,
    DateRangeComponent,


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
