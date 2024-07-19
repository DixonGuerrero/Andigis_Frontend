import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {
  DialogService,
  DynamicDialogComponent,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { IBook } from '../../../../core/models/admin/book.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../../../core/services/admin/book.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [ButtonModule, DialogModule, ReactiveFormsModule, ToastModule],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css',
})
export class BookEditComponent implements OnInit {

  bookService = inject(BookService)

  @Output() bookUpdated = new EventEmitter<IBook>();

  visible:boolean = true;
  instance: DynamicDialogComponent | undefined;
  book: IBook = {
    id: '',
    name: '',
    copies: 0,
    genre: '',
    author: '',
    image_url: '',
  };
  formEditbook = new FormGroup({
    nombre: new FormControl(''),
    copias: new FormControl(0),
    autor: new FormControl(''),
    genero: new FormControl(''),
    imagen: new FormControl(''),
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
    this.book = this.instance?.data.book;
    this.initFormValues();
  }
  private initFormValues() {
    this.formEditbook.patchValue({
      nombre: this.book?.name ?? '',
      copias: this.book?.copies ?? 0,
      autor: this.book?.author ?? '',
      genero: this.book?.genre ?? '',
      imagen: this.book?.image_url ?? '',
    });
  }

  editBook(): void {
    if (
      this.formEditbook.value.nombre === '' ||
      this.formEditbook.value.copias === 0 ||
      this.formEditbook.value.autor === '' ||
      this.formEditbook.value.genero === '' ||
      this.formEditbook.value.imagen === ''
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Campos vacios',
      });
      return;
    }
    const bookDataEdit: IBook = {
      id: this.book.id,
      name: this.formEditbook.value.nombre ?? this.book.name,
      copies: this.formEditbook.value.copias ?? this.book.copies,
      genre: this.formEditbook.value.genero ?? this.book.genre,
      author: this.formEditbook.value.autor ?? this.book.author,
      image_url: this.formEditbook.value.imagen ?? this.book.image_url,
    };

    this.bookService.updateBook(bookDataEdit).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Libro editado',
        });
        this.instance?.close();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al editar el libro',
        });
      }
    );
  }
}
