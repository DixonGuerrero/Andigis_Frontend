import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

//Importaciones de PrimeNG
import { ConfirmationService, MessageService } from 'primeng/api'; 

//Importaciones para las animaciones
import { provideAnimations } from '@angular/platform-browser/animations';
import { ConfirmDialog } from 'primeng/confirmdialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    MessageService,
    ConfirmationService
  ]
};
