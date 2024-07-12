import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LayoutComponent } from "./layout/layout.component";
import { BookPageComponent } from "./books/book-page/book-page.component";
import { SearchComponent } from "./search/search.component";
import { LoanPageComponent } from "./loan-page/loan-page.component";


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
         }
         
         
      ]
   }
]