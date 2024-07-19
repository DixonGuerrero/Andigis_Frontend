import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IBookMovements } from '../../../../core/models/admin/bookTran.interface';
import { BookTransactionService } from '../../../../core/services/admin/bookTransaction.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-loan-add',
  standalone: true,
  imports: [ReactiveFormsModule,ButtonModule,ToastModule],
  templateUrl: './loan-add.component.html',
  styleUrl: './loan-add.component.css'
})

export class LoanAddComponent implements OnInit{
  instance : DynamicDialogComponent|undefined;
  visible=true;
  id_book:string="";

  bookTransactionService=inject(BookTransactionService)

  formaddloan= new FormGroup({ 
     document:new FormControl ( '' ),
     name_lender:new FormControl('')
    })

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    public ref: DynamicDialogRef
  
  ) {
    this.instance=this.dialogService.getInstance( ref)
  }
   ngOnInit(): void {
    this.id_book=this.instance?.data.id_book

     
   }
   addloan(){
    if (this.formaddloan.value.document === '' || this.formaddloan.value.name_lender=== ''){
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Rellene los campos'});
      return
    }else{
      
    const dataloan:IBookMovements={
      id_book:this.id_book, 
      document:this.formaddloan.value.document?? '',
      date:this.formatDate(new Date()),
      type:"loan",
      name_render:this.formaddloan.value.name_lender ??'',

    }
    this.bookTransactionService.createBookTransaction(dataloan).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Exito',
        detail: 'Prestamo registrado',
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
