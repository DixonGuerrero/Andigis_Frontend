import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SearchService } from '../../core/services/admin/search.service';
import { CognitoService } from '../../core/services/auth/cognito.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,ConfirmDialogModule,MenuModule, ButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent { 


  
  opciones: MenuItem[] | undefined;
  formSearch = new FormGroup({
    search: new FormControl('')
  });

  constructor(
    private searchService: SearchService, 
    public router: Router,
    public messageService : MessageService,
    public cognitoService: CognitoService,
    public confirmationService: ConfirmationService  
  ) {}

  ngOnInit(): void {
        this.opciones = [
            {
                label: 'Opciones',
                items: [
                    {
                      label: 'Configuracion',
                      icon: 'pi pi-cog',
                      routerLink: ['/admin/settings']
                      

                    },
                    {
                        label: 'Cerrar Sesion',
                        icon: 'pi pi-sign-out',
                        command: () => {
                            this.confirmCloseSesion();
                        }
                    }
                    
                    //TODO: Aqui se pueden agregar mas opciones al menu desplegable del navbar 😁
                ]
            }
        ];
  }



  onSubmit(): void {
    if(this.formSearch.value.search === '') {
      console.log('No se envio nada');
      this.messageService.add({severity:'error', summary: 'Error', detail: 'No se envio nada'});
      return;
    }

    const searchTerm = this.formSearch.value.search ?? 'No se envio nada';
    this.searchService.setSearchTerm(searchTerm);

    this.router.navigate(['/admin/search']);

    
  } 

  confirmCloseSesion(event: Event = new Event('')): void {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Estas seguro de cerrar sesion?',
        header: 'Sesion Confirmacion',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Cerrando sesion ...' });
            this.signOut();
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Cancelado' });
        }
    });
}

  signOut(): void {
    this.cognitoService.signOut().then(() => {
      this.messageService.add({severity:'success', summary: 'Exito', detail: 'Sesion cerrada'});
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.messageService.add({severity:'error', summary: 'Error', detail: error.message});
    });
  }
}
