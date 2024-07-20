import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

export const RoutesAuth: Routes = [
   {
     path: '', component: LoginComponent, 
   },
   {
     path: 'login',
     component: LoginComponent,
   },
   {
    path: 'register', component: RegisterComponent
   }
  
 ];