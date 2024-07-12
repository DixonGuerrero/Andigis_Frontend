import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { SearchService } from '../../core/services/admin/search.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,MenuModule, ButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent { 
  
  opciones: MenuItem[] | undefined;
  formSearch = new FormGroup({
    search: new FormControl('')
  });

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit(): void {
        this.opciones = [
            {
                label: 'Opciones',
                items: [
                    {
                      label: 'Configuracion',
                      icon: 'pi pi-cog',
                      

                    },
                    {
                        label: 'Cerrar Sesion',
                        icon: 'pi pi-sign-out',
                        routerLink: ['/login']
                    }
                    
                    //TODO: Aqui se pueden agregar mas opciones al menu desplegable del navbar 😁
                ]
            }
        ];
  }



  onSubmit(): void {
    if(this.formSearch.value.search === '') {
      return;
    }

    const searchTerm = this.formSearch.value.search ?? 'No se envio nada';
    this.searchService.setSearchTerm(searchTerm);

    this.router.navigate(['/admin/search']);

    
  } 
}
