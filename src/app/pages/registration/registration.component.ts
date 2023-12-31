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
    const parts = errorMessage.split(',');
    const formattedMessage = parts.join(',\n');
    return formattedMessage;
}

  doRegistration(registrationData: Registration) {
    this.authService.register(registrationData).subscribe(
      (res) => {
        this._snackBar.open("User "+ res.firstName +" in successfully", "OK",  {
            duration: 3000,
          });

        this.route.navigateByUrl("/login")
      },
      (err) => {
        this._snackBar.open(this.fontSrv.capitalize(this.formatErrorMessage(err.error.message)), "OK");
        }
    );
  }
}
