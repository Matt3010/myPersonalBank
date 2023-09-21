import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Registration } from 'src/app/interfaces/registration';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent  {

  emailError: string | null = null;
  passwordError: string | null = null;
  confirmPasswordError: string | null = null;
  nomeTitolareError: string | null = null;
  cognomeTitolareError: string | null = null;

  @Output() registrationEmit = new EventEmitter<Registration>();
  @Input() registrationErrors: any | null = null;

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      // Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})')
      confirmPassword: new FormControl("", [Validators.required]),
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
    }, { validators: this.passwordMatchValidator });
  }

  

  emitRegistration() {
    this.emailError = null;
    this.passwordError = null;
    this.confirmPasswordError = null;
    this.nomeTitolareError = null;
    this.cognomeTitolareError = null;
    this.registrationErrors = null;

    if (this.registrationForm.valid) {
      let registrationPayload: Registration = {
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        confirmPassword: this.registrationForm.value.confirmPassword,
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName
      };
      this.registrationEmit.emit(registrationPayload);
    } else {
      this.emailError = this.registrationForm.get('email')?.hasError('required') ? 'Campo obbligatorio' : this.registrationForm.get('email')?.hasError('email') ? 'Inserisci un indirizzo email valido' : null;
      this.passwordError = this.registrationForm.get('password')?.hasError('required') ? 'Campo obbligatorio' : this.registrationForm.get('password')?.hasError('pattern') ? 'La password deve contenere almeno 8 caratteri, una maiuscola e un simbolo' : null;
      this.confirmPasswordError = this.registrationForm.get('confirmPassword')?.hasError('required') ? 'Campo obbligatorio' : this.registrationForm.hasError('passwordsNotMatch') ? 'Le password devono coincidere' : null;
      this.nomeTitolareError = this.registrationForm.get('firstName')?.hasError('required') ? 'Campo obbligatorio' : null;
      this.cognomeTitolareError = this.registrationForm.get('lastName')?.hasError('required') ? 'Campo obbligatorio' : null;
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsNotMatch: true };
  }
}



