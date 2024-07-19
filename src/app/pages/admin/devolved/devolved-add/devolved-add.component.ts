import { Component, inject } from '@angular/core';
import { IBookMovements } from '../../../../core/models/admin/bookTran.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogComponent,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BookTransactionService } from '../../../../core/services/admin/bookTransaction.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-devolved-add',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule,ToastModule],
  templateUrl: './devolved-add.component.html',
  styleUrl: './devolved-add.component.css',
})
export class DevolvedAddComponent {
  instance: DynamicDialogComponent | undefined;
  visible = true;
  id_book: string = '';

  bookTransactionService = inject(BookTransactionService)

  formadddevoled = new FormGroup({
    document: new FormControl(''),
    name_lender: new FormControl(''),
  });

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    public ref: DynamicDialogRef
  ) {
    this.instance = this.dialogService.getInstance(ref);
  }
  ngOnInit(): void {
    this.id_book = this.instance?.data.id_book;
  }
  adddevoled() {
    if (
      this.formadddevoled.value.document === '' ||
      this.formadddevoled.value.name_lender === ''
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Rellene los campos',
      });
      return;
    } else {
      const datadevoled: IBookMovements = {
        id_book: this.id_book,
        document: this.formadddevoled.value.document ?? '',
        date: this.formatDate(new Date()),
        type: 'return',
        name_render: this.formadddevoled.value.name_lender ?? '',
      };

      console.log(datadevoled);
      
     this.bookTransactionService.createBookTransaction(datadevoled).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Devolución registrada',
        });
        this.ref?.close();
      }); 

    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
}
