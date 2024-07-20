import { Routes } from '@angular/router';
import { loginGuard } from './core/guards/auth.guard';

export const routes: Routes = [
   {
      path: '', loadChildren: () => import('./pages/auth/auth.routes').then(m => m.RoutesAuth)
   },
   {
      path: 'admin', loadChildren: () => import('./pages/admin/admin.routes').then(m => m.RoutesAdmin), canActivate: [loginGuard]
   },
   {
      path: '**', loadComponent: () => import('./shared/not-found/not-found.component').then(m => m.NotFoundComponent)
   }
];
