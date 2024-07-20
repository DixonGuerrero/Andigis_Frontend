import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CognitoService } from '../../../core/services/auth/cognito.service';
import { IUser } from '../../../core/models/auth/user.interface';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    RippleModule,
    PasswordModule,
    InputTextModule,
    DividerModule,
    ProgressSpinnerModule,
    InputOtpModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  value!: string;
  signupForm: FormGroup;
  confirmForm: FormGroup;
  isConfirm = false;
  loading = false;
  user: IUser;

  constructor(
    private cognitoService: CognitoService,
    public router: Router,
    public messageService: MessageService
  ) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      showPassword: new FormControl(false),
    });

    this.confirmForm = new FormGroup({
      code: new FormControl('', Validators.required),
    });

    this.user = {
      email: '',
      password: '',
      code: '',
      name: '',
      showPassword: false,
      picture: '',
    };
  }

  public signUp(): void {
    if (this.signupForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Campos vacíos o incorrectos',
      });
      return;
    }

    this.user.email = this.signupForm.value.email;
    this.user.password = this.signupForm.value.password;

    this.loading = true;
    this.cognitoService
      .signUp(this.user)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuario registrado correctamente, ahora confirma tu correo',
        });

        this.loading = false;
        this.isConfirm = true;
      })
      .catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error,
        });
        this.loading = false;
      });
  }

  public confirmSignUp(): void {
    this.loading = true;

    if (this.confirmForm.value.code === '') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Campo vacío',
      });
      this.loading = false;
      return;
    }

    this.user.code = this.confirmForm.value.code;

    this.cognitoService
      .confirmSignUp(this.user)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuario confirmado correctamente',
        });

        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error,
        });
        this.loading = false;
      });
  }
}
