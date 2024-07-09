import { Component } from '@angular/core';
import { BookCardComponent } from '../books/book-card/book-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
