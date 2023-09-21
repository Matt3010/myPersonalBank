import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Registration } from 'src/app/interfaces/registration';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FontService } from 'src/app/services/utils/font.service';

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  constructor(private authService: AuthService,private route: Router, private toastr: ToastrService, private fontSrv: FontService) {}


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
        this.toastr.success("User "+ res.email +" in successfully", "My personal Bank")
         this.route.navigateByUrl("/login")
      },
      (err) => {
          this.toastr.error(this.fontSrv.capitalize(this.formatErrorMessage(err.error.message)), "My personal Bank")
      }
    );
  }
}
