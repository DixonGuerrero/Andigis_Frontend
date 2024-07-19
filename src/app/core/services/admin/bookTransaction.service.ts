import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, shareReplay, catchError, map, switchMap, of, Subject } from 'rxjs';
import { IBookMovements } from '../../models/admin/bookTran.interface';

@Injectable({
  providedIn: 'root',
})
export class BookTransactionService {
  baseUrl = environment.API_URL + 'book-transaction/';
  http = inject(HttpClient);

  private bookCache$: Observable<IBookMovements[]> | null = null;

  private bookTransactionUpdatedSource = new Subject<IBookMovements>();
  bookTransactionUpdated$ = this.bookTransactionUpdatedSource.asObservable();

  private bookTransactionCreatedSource = new Subject<IBookMovements>();
  bookTransactionCreated$ = this.bookTransactionCreatedSource.asObservable();


  notifyBookTransactionUpdated(updatedBook: IBookMovements) {
    this.bookTransactionUpdatedSource.next(updatedBook);
  }

  notifyBookTransactionCreated(newBook: IBookMovements) {
    this.bookTransactionCreatedSource.next(newBook);
  }



  getBooksTransaction(): Observable<IBookMovements[]> {
    if (!this.bookCache$) {
      this.bookCache$ = this.http.get<IBookMovements[]>(this.baseUrl).pipe(
        shareReplay(1),
        catchError((error) => {
          this.bookCache$ = null;
          return of([]); 
        })
      );
    }
    return this.bookCache$;
  }

  getBookTransaction(id: string): Observable<IBookMovements | null> {
    return this.http.get<IBookMovements | null>(this.baseUrl + id);
  }

  createBookTransaction(book: IBookMovements): Observable<IBookMovements | any> {
    return this.http.post<IBookMovements | any>(this.baseUrl, book).pipe(
      map((createdBook: IBookMovements) => {
        this.notifyBookTransactionCreated(createdBook); // Notificar con los datos del libro creado
        return createdBook;
      }),
      switchMap(() => this.clearCacheAndReturnBooksTransaction())
    );
  }

  updateBookTransaction(book: IBookMovements): Observable<any> {
    return this.http.put(this.baseUrl, book).pipe(
      map(() => {
        this.notifyBookTransactionUpdated(book); // Notificar con los datos del libro actualizado
        return book;
      }),
      switchMap(() => this.clearCacheAndReturnBooksTransaction())
    );
  }


  private clearCacheAndReturnBooksTransaction(): Observable<IBookMovements[]> {
    this.bookCache$ = null;
    return this.getBooksTransaction();
  }

  updateBooksTransactionCache(): void {
    this.bookCache$ = this.http.get<IBookMovements[]>(this.baseUrl).pipe(
      shareReplay(1),
      catchError((error) => {
        this.bookCache$ = null; 
        return of([]); 
      })
    );
  }
}
