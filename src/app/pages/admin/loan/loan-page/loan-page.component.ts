import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { IBookMovements } from '../../../../core/models/admin/bookTran.interface';
import { FormsModule } from '@angular/forms';
import { BookTransactionService } from '../../../../core/services/admin/bookTransaction.service';
import { Observable } from 'rxjs';
import { BookService } from '../../../../core/services/admin/book.service';
import { IBook } from '../../../../core/models/admin/book.interface';

@Component({
  selector: 'app-loan-page',
  standalone: true,
  imports: [TableModule, ToastModule, CommonModule, TagModule, DropdownModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './loan-page.component.html',
  styleUrl: './loan-page.component.css'
})
export class LoanPageComponent implements OnInit {
  
  loans: IBookMovements[] = [];
  books: IBook[] = [];
  statuses!: SelectItem[];

  constructor(
    private messageService: MessageService,
    private bookTransactionService: BookTransactionService,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.loadBookTransactions();

    this.loadBookData();

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
      this.loans = data;

      this.loansFilter()
    });
  }

  loadBookData(){
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    })
  }

  getImageUrl(bookId: string):string | undefined {
    const book = this.books.find(book => book.id === bookId);
    return book ? book.image_url : '';
  }

  loansFilter(){
    this.loans = this.loans.filter(loan => loan.type === 'loan');
  }

  onRowEditInit(loan: IBookMovements) {
    // No se necesita clonación de productos
  }

  onRowEditSave(loan: IBookMovements) {

    console.log('data loan', loan)

    if (loan.id_book && loan.date && loan.document) {
      this.bookTransactionService.updateBookTransaction(loan).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Prestamo actualizado con exito' });
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
