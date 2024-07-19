import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { IBookMovements } from '../../../../core/models/admin/bookTran.interface';
import { IBook } from '../../../../core/models/admin/book.interface';
import { BookTransactionService } from '../../../../core/services/admin/bookTransaction.service';
import { BookService } from '../../../../core/services/admin/book.service';


@Component({
  selector: 'app-devolved-page',
  standalone: true,
  imports: [TableModule, ToastModule, CommonModule, TagModule, DropdownModule, ButtonModule, InputTextModule,FormsModule],
  templateUrl: './devoled-page.component.html',
  styleUrl: './devoled-page.component.css'
})
export class devoledPageComponent {

  returns: IBookMovements[] = [];
  books: IBook[] = [];
  statuses!: SelectItem[];

  constructor(
    private messageService: MessageService,
    private bookTransactionService: BookTransactionService,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.loadBookTransactions();

    this.loanBookData();

    this.bookTransactionService.bookTransactionUpdated$.subscribe(() => {
      this.loadBookTransactions();
    });

    this.bookTransactionService.bookTransactionCreated$.subscribe(() => {
      this.loadBookTransactions();
    });


    this.statuses = [
      { label: 'In Stock', value: 'INSTOCK' },
      { label: 'Low Stock', value: 'LOWSTOCK' },
      { label: 'Out of Stock', value: 'OUTOFSTOCK' }
    ];
  }

  loadBookTransactions(): void {
    this.bookTransactionService.getBooksTransaction().subscribe((data) => {
      this.returns = data;

      this.returnsFilter()
    });
  }

  loanBookData(){
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    })
  }

  getImageUrl(bookId: string):string | undefined {
    const book = this.books.find(book => book.id === bookId);
    return book ? book.image_url : '';
  }

  returnsFilter(){
    this.returns = this.returns.filter(loan => loan.type === 'return');
  }

  onRowEditInit(loan: IBookMovements) {
    // No se necesita clonación de productos
  }

  onRowEditSave(devolved: IBookMovements) {
    if (devolved.id_book && devolved.date && devolved.document) {
      this.bookTransactionService.updateBookTransaction(devolved).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Devolucion actualizada con exito' });
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Datos invalidos' });
    }
  }

  onRowEditCancel(loan: IBookMovements, index: number) {
    // No se necesita revertir cambios
  }

  createTransaction(loan: IBookMovements) {
    this.bookTransactionService.createBookTransaction(loan).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Transaction created successfully' });
    });
  }



  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }
}


