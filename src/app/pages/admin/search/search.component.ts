import { Component, inject } from '@angular/core';
import { SearchService } from '../../../core/services/admin/search.service';
import { Subscription } from 'rxjs';
import { BookService } from '../../../core/services/admin/book.service';
import { IBook } from '../../../core/models/admin/book.interface';
import { BookCardComponent } from '../books/book-card/book-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm: string = '';
  searchService = inject(SearchService)
  booksService = inject(BookService)

  books: IBook[] = [];
  booksClone: IBook[] = [];

  private searchSubscription: Subscription = new Subscription();



  ngOnInit(): void {

    this.searchSubscription = this.searchService.searchTerm$.subscribe((term: string) => {
      this.searchTerm = term;
      this.loadDataBooks()
    });

    
  }

  loadDataBooks(){
    this.booksService.getBooks().subscribe((data) => {
      this.books = data;
      this.booksClone = data;

      this.searckBook();
    });
  }

  searckBook(): void {

    if(this.searchTerm === ''){
      this.books = this.booksClone;
      return;
    }

    this.books = this.booksClone.filter(book => book.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
}
