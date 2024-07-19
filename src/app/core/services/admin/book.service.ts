import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, shareReplay, catchError, map, switchMap, of, Subject } from 'rxjs';
import { IBook } from '../../models/admin/book.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseUrl = environment.API_URL + 'Book/';
  http = inject(HttpClient);

  private bookCache$: Observable<IBook[]> | null = null;

  private bookUpdatedSource = new Subject<IBook>();
  bookUpdated$ = this.bookUpdatedSource.asObservable();

  private bookCreatedSource = new Subject<IBook>();
  bookCreated$ = this.bookCreatedSource.asObservable();

  private bookDeletedSource = new Subject<string>();
  bookDeleted$ = this.bookDeletedSource.asObservable();

  notifyBookUpdated(updatedBook: IBook) {
    this.bookUpdatedSource.next(updatedBook);
  }

  notifyBookCreated(newBook: IBook) {
    this.bookCreatedSource.next(newBook);
  }

  notifyBookDeleted(deletedBookId: string) {
    this.bookDeletedSource.next(deletedBookId);
  }

  getBooks(): Observable<IBook[]> {
    if (!this.bookCache$) {
      this.bookCache$ = this.http.get<IBook[]>(this.baseUrl).pipe(
        shareReplay(1),
        catchError((error) => {
          this.bookCache$ = null;
          return of([]); 
        })
      );
    }
    return this.bookCache$;
  }

  getBook(id: string): Observable<IBook | null> {
    return this.http.get<IBook | null>(this.baseUrl + id);
  }

  createBook(book: IBook): Observable<IBook | any> {
    return this.http.post<IBook | any>(this.baseUrl, book).pipe(
      map((createdBook: IBook) => {
        this.notifyBookCreated(createdBook); // Notificar con los datos del libro creado
        return createdBook;
      }),
      switchMap(() => this.clearCacheAndReturnBooks())
    );
  }

  updateBook(book: IBook): Observable<any> {
    return this.http.put(this.baseUrl, book).pipe(
      map(() => {
        this.notifyBookUpdated(book); // Notificar con los datos del libro actualizado
        return book;
      }),
      switchMap(() => this.clearCacheAndReturnBooks())
    );
  }

  deleteBook(id: string = 'ADFDF'): Observable<any> {
    return this.http.delete(this.baseUrl + id).pipe(
      map(() => {
        this.notifyBookDeleted(id); // Notificar con el ID del libro eliminado
      }),
      switchMap(() => this.clearCacheAndReturnBooks())
    );
  }

  private clearCacheAndReturnBooks(): Observable<IBook[]> {
    this.bookCache$ = null;
    return this.getBooks();
  }

  updateBooksCache(): void {
    this.bookCache$ = this.http.get<IBook[]>(this.baseUrl).pipe(
      shareReplay(1),
      catchError((error) => {
        this.bookCache$ = null; 
        return of([]); 
      })
    );
  }
}
