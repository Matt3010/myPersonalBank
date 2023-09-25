import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Registration } from 'src/app/interfaces/registration';
import { Router } from '@angular/router';
import { FontService } from 'src/app/services/utils/font.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  constructor(private authService: AuthService,private route: Router,private _snackBar: MatSnackBar, private fontSrv: FontService) {}


  formatErrorMessage(errorMessage: string) {
    // Dividi il messaggio in base alle virgole
    const parts = errorMessage.split(',');

    // Unisci le parti del messaggio con un ritorno a capo tra di loro
    const formattedMessage = parts.join(',\n');

    return formattedMessage;
}

  doRegistration(registrationData: Registration) {
    this.authService.register(registrationData).subscribe(
      (res) => {
        this._snackBar.open("User "+ res.email +" in successfully", "OK");

        this.route.navigateByUrl("/login")
      },
      (err) => {
        this._snackBar.open(this.fontSrv.capitalize(this.formatErrorMessage(err.error.message)), "OK");
        }
    );
  }
}
