import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ToastModule, ButtonModule, RippleModule, PasswordModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  constructor(private router: Router, private messageService: MessageService) {}

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  onLogin(): void {
    if (this.loginForm.value.username === '' || this.loginForm.value.password === '') {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos'});
      return;
    }
    

    //TODO: Implementar la lógica de login

    this.messageService.add({severity: 'success', summary: 'Éxito', detail: 'Inicio de sesión correcto'});

    setTimeout(() => {
      this.router.navigate(['/admin']);
    }, 1000);
  }
}
