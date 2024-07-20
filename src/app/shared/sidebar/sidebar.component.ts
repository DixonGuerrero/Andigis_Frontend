import { Component, HostBinding, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { IUser } from '../../core/models/auth/user.interface';
import { CognitoService } from '../../core/services/auth/cognito.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive,RouterLink, NavBarComponent,MenuModule, ButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {

  user: IUser;

  items: MenuItem[] | undefined;

  logo: any;
  barraLateral: any;
  spans: any;
  palanca: any;
  circulo: any;
  menu: any;
  main: any;
  
  darkMode = signal<boolean>(true)
  bigMenu = signal<boolean>(false)

  constructor( private cognitoService: CognitoService) {
    this.user = {} as IUser;
  }

  ngOnInit(): void {

    
    this.cognitoService.userUpdated$.subscribe((updatedUser: IUser) => {
      this.user = updatedUser; 
    });
    
    this.getUserInfo();

     this.items = [
          {
              label: 'Options',
              items: [
                  {
                      label: 'Refresh',
                      icon: 'pi pi-refresh'
                  },
                  {
                      label: 'Export',
                      icon: 'pi pi-upload'
                  }
              ]
          }
      ];
    this.initializeMenu();
    this.checkTimeForDarkMode()
  }

  @HostBinding('class.dark') get mode() {
    return this.darkMode()
  }

  initializeMenu(): void {
    this.logo = document.getElementById('logo');
    this.barraLateral =
      document.querySelector<HTMLDivElement>('.barra-lateral');
    this.spans = document.querySelectorAll<HTMLSpanElement>('span');
    this.palanca = document.querySelector<HTMLDivElement>('.switch');
    this.circulo = document.querySelector<HTMLDivElement>('.circulo');
    this.menu = document.querySelector<HTMLDivElement>('.menu');
    this.main = document.querySelector<HTMLElement>('main');

  }

  toggleLogo() {
    this.barraLateral.classList.toggle('mini-barra-lateral');
    this.main.classList.toggle('min-main');
    console.log(this.main)
    this.spans.forEach((span: any) => {
      span.classList.toggle('oculto');
    });
  }

  sizeSidebar() {
    this.bigMenu.set(!this.bigMenu())
    this.barraLateral.classList.toggle('max-barra-lateral');
    if (this.barraLateral.classList.contains('max-barra-lateral')) {
      if (this.menu.children.length > 1) {
        this.menu.children[0].setAttribute('style', 'display: none');
        this.menu.children[1].setAttribute('style', 'display: block');
      }
    } else {
      if (this.menu.children.length > 1) {
        this.menu.children[0].setAttribute('style', 'display: block');
        this.menu.children[1].setAttribute('style', 'display: none');
      }
    }
    if (window.innerWidth <= 320) {
      this.barraLateral.classList.add('mini-barra-lateral');
      this.main.classList.add('min-main');
      this.spans.forEach((span: any) => {
        span.classList.add('oculto');
      });
    }
  }

  checkTimeForDarkMode(): void {
    const currentHour = new Date().getHours();
    if (currentHour >= 18 || currentHour < 6) { 
      this.darkMode.set(true);
    } else {
      this.darkMode.set(false);
    }
  }

  //Funcion para obtener info del usuario
  getUserInfo(): void {
    this.cognitoService.getUser().then((user) => {
      this.user = user.attributes;
    })
  }

}