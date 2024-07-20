import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LayoutComponent } from "./layout/layout.component";
import { BookPageComponent } from "./books/book-page/book-page.component";
import { SearchComponent } from "./search/search.component";
import { LoanPageComponent } from "./loan/loan-page/loan-page.component";
import { devoledPageComponent } from "./devolved/devoled-page/devoled-page.component";
import { SettingsUserComponent } from "./settings-user/settings-user.component";


export const RoutesAdmin: Routes = [
   {
      path: '', component: LayoutComponent, children:[
         {
            path: '', redirectTo: 'dashboard', pathMatch: 'full'
         },
         {
            path: 'dashboard', component: DashboardComponent
         },
         {
            path: 'books', component: BookPageComponent
         },
         {
            path: 'search', component: SearchComponent
         },
         {
            path: 'loans', component: LoanPageComponent
         },
         {
            path: 'devolved', component: devoledPageComponent
         },
         {
            path: 'settings', component: SettingsUserComponent
         }

         
      ]
   }
]