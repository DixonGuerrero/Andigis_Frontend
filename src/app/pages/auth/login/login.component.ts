import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CognitoService } from '../../../core/services/auth/cognito.service';
import { IUser } from '../../../core/models/auth/user.interface';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    PasswordModule,
    InputTextModule,
    ProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loading: boolean;
  user: IUser;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private cognitoService: CognitoService
  ) {
    this.loading = false;
    this.user = {} as IUser;
    this.loginForm = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });
  }

  

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Usuario o contraseña vacios',
      });
      return;
    }

    this.user.email = this.loginForm.value.username;
    this.user.password = this.loginForm.value.password;

    this.loading = true;
    this.cognitoService
      .signIn(this.user)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Inicio de sesión correcto',
        });

        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 1000);
      })
      .catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
        this.loading = false;
      });
  }
}
