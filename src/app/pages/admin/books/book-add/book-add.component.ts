import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IBook } from '../../../../core/models/admin/book.interface';
import { BookService } from '../../../../core/services/admin/book.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-book-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.css'
})
export class BookAddComponent implements OnInit {

  bookService = inject(BookService)
  messageService = inject(MessageService)

  instance: DynamicDialogComponent | undefined;

  bookAddForm = new FormGroup({
    name: new FormControl(''),
    copies: new FormControl(0),
    genre: new FormControl(''),
    author: new FormControl(''), 
    image_url: new FormControl(''),
  });

  constructor(
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    public ref: DynamicDialogRef
  ) {
    this.instance = this.dialogService.getInstance(ref);
  }

  ngOnInit(): void {
    
  }

  createBook(){
    if(this.bookAddForm.value.name === '' || this.bookAddForm.value.copies === 0 || this.bookAddForm.value.genre === '' || this.bookAddForm.value.author === '' || this.bookAddForm.value.image_url === ''){
      alert('Rellene los campos');
      return;
    }
    const dataNewBook: IBook = {
      name: this.bookAddForm.value.name ?? '',
      copies: this.bookAddForm.value.copies ?? 0,
      genre: this.bookAddForm.value.genre ?? '',
      author: this.bookAddForm.value.author ?? '',
      image_url: this.bookAddForm.value.image_url ?? '',
    }

    this.bookService.createBook(dataNewBook).subscribe((data) => {
      if(data.id !== ''){
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Libro creado con éxito'
        });
        this.instance?.close()
        this.bookAddForm.reset();
      }
    },(error) => {
      console.error(error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al crear el libro'
      });
  })
}
}
