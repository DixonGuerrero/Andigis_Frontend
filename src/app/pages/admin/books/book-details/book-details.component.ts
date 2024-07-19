import { Component, inject } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogComponent,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { BookEditComponent } from '../book-edit/book-edit.component';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { IBook } from '../../../../core/models/admin/book.interface';
import { LoanAddComponent } from '../../loan/loan-add/loan-add.component';
import { devoledPageComponent } from '../../devolved/devoled-page/devoled-page.component';
import { DevolvedAddComponent } from '../../devolved/devolved-add/devolved-add.component';
import { BookService } from '../../../../core/services/admin/book.service';
@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [ToastModule, SpeedDialModule, ConfirmDialogModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
  providers: [ConfirmDialog],
})
export class BookDetailsComponent {
  items: MenuItem[] | undefined;
  bookService = inject(BookService);

  instance: DynamicDialogComponent | undefined;

  book: IBook = {
    id: '',
    name: '',
    copies: 0,
    genre: '',
    author: '',
    image_url: '',
  };

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    public ref: DynamicDialogRef
  ) {
    this.instance = this.dialogService.getInstance(ref);
  }

  ngOnInit() {
    this.book = this.instance?.data['book'];
    this.items = [
      {
        icon: 'pi pi-pencil',
        command: () => {
          this.editBook();
        },
      },
      {
        icon: 'pi pi-trash',
        command: () => {
          this.deleteBook(event);
        },
      },
      {
        icon: 'pi pi-upload',
        command: () => {
          this.addLoan();
        },
      },
      {
        icon: 'pi pi-arrow-down',
        command: () => {
          this.addReturn();
        },
      },
    ];

    this.bookService.bookUpdated$.subscribe((updatedBook) => {
      this.book = updatedBook;
    })
  }

  editBook() {
    const ref = this.dialogService.open(BookEditComponent, {
      header: 'Actualizar Libro',
      modal: true,
      dismissableMask: true,
      style: {
        width: 'auto',
        height: '70%',
      },
      data: {
        book: this.book,
      },
    });

    ref.onClose.subscribe((updatedBook: IBook) => {
      if (updatedBook) {
        console.log('updatedBook', updatedBook);
        this.book = updatedBook; 
      }
    });
  }

  addReturn() {
    this.dialogService.open(DevolvedAddComponent, {
      header: 'Devolver Libro',
      modal: true,
      dismissableMask: true,
      style: {
        width: 'auto',
        height: '50%',
      },
      data: {
        id_book: this.book.id,
      },
    });
  }
  addLoan() {
    this.dialogService.open(LoanAddComponent, {
      header: 'Prestar Libro',
      modal: true,
      dismissableMask: true,
      style: {
        width: 'auto',
        height: '50%',
      },
      data: {
        id_book: this.book.id,
      },
    });
  }

  deleteBook(event: Event = new Event('')) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseas eliminarla?',
      header: 'Eliminar',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {

        this.bookService.deleteBook(this.book.id).subscribe(
          (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Exito',
              detail: 'Libro Eliminado',
            });
            this.instance?.close();
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al eliminar el libro',
            });
          }
        );

       
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rechazado',
          detail: 'Cancelado',
        });
      },
    });
  }
}
