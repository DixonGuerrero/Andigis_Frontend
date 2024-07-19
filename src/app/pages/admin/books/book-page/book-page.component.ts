import { Component, OnInit, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IBook } from '../../../../core/models/admin/book.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { BookService } from '../../../../core/services/admin/book.service';
import { BookAddComponent } from '../book-add/book-add.component';

@Component({
  selector: 'app-book-page',
  templateUrl: 'book-page.component.html',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule],
  styleUrl: 'book-page.component.css',
  providers: [],
})
export class BookPageComponent implements OnInit {

  books: IBook[] = [];
  bookService = inject(BookService);

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService
  ) {}

  ref: DynamicDialogRef | undefined;

  show(book: IBook) {
    this.ref = this.dialogService.open(BookDetailsComponent, {
      header: 'Detalles',
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },

      data: {
        book,
      },
    });

    this.ref.onClose.subscribe((data: any) => {});

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Maximized',
        detail: `maximized: ${value.maximized}`,
      });
    });
  }

  formAddBook(){
    this.ref = this.dialogService.open(BookAddComponent, {
      header: 'Agregar libro',
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },

     
    });

    this.ref.onClose.subscribe((data: any) => {});

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Maximized',
        detail: `maximized: ${value.maximized}`,
      });
    });
  }

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

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }


}
