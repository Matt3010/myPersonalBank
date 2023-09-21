import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Registration } from 'src/app/interfaces/registration';
import { Router } from '@angular/router';

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationErrors: any = null;

  constructor(private authService: AuthService,private route: Router) {}

  registerUser(registrationData: Registration) {
    this.authService.register(registrationData).subscribe(
      (res) => {
        console.log('Registrazione riuscita');
        this.route.navigateByUrl("/login")
      },
      (error) => {
        console.error('Errore durante la registrazione:', error);
        this.registrationErrors = error;
      }
    );
  }
}
