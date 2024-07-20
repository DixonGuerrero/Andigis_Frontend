import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { CognitoService } from "../services/auth/cognito.service";


export const loginGuard = () => {
   const cognitoService = inject(CognitoService);
   const router = inject(Router);
   const messageService = inject(MessageService);


   cognitoService.isAuthenticated().then((isAuth) => {
      if(!isAuth){
         router.navigate(['/login']);
         messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Usuario no autenticado'
         });
         return false;
      }

      return
   }).catch((error) => {
      router.navigate(['/login']);
      messageService.add({
         severity: 'error',
         summary: 'Error',
         detail: error
      });
      return false;
   });

   return true;
}