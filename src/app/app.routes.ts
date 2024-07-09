import { Routes } from '@angular/router';

export const routes: Routes = [
   {
      path: '', loadChildren: () => import('./pages/auth/auth.routes').then(m => m.RoutesAuth)
   },
   {
      path: 'admin', loadChildren: () => import('./pages/admin/admin.routes').then(m => m.RoutesAdmin)
   }
];
