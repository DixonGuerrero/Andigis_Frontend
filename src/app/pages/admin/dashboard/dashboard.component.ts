import { Component, OnInit, inject } from '@angular/core';
import { BookCardComponent } from '../books/book-card/book-card.component';
import { IBook } from '../../../core/models/admin/book.interface';
import { BookService } from '../../../core/services/admin/book.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  bookService = inject(BookService)

  books: IBook[] = [];

  ngOnInit(): void {
    this.loadBooks();

    this.bookService.bookUpdated$.subscribe((updatedBook) => {
      this.updateBookInList(updatedBook);
    });

    this.bookService.bookCreated$.subscribe((newBook) => {
      this.addBookToList(newBook);
    });

    this.bookService.bookDeleted$.subscribe((deletedBookId) => {
      this.removeBookFromList(deletedBookId);
    });
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

  updateBookInList(updatedBook: IBook): void {
    const index = this.books.findIndex(book => book.id === updatedBook.id);
    if (index !== -1) {
      this.books[index] = updatedBook;
    }
  }

  addBookToList(newBook: IBook): void {
    this.books.push(newBook);
  }

  removeBookFromList(deletedBookId: string): void {
    this.books = this.books.filter(book => book.id !== deletedBookId);
  }


}

