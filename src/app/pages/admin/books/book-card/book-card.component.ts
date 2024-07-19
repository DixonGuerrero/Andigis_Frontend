import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IBook } from '../../../../core/models/admin/book.interface';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CardModule, ButtonModule, ToastModule, DynamicDialogModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
  providers: [DialogService, MessageService]
})
export class BookCardComponent {
    @Input() book: IBook = {
        id: '',
        name: '',
        copies: 0,
        genre: '',
        author: '',
        image_url: ''
    };


constructor(public dialogService: DialogService, public messageService: MessageService) {}

ref: DynamicDialogRef | undefined;

show() {
    this.ref = this.dialogService.open( BookDetailsComponent, {
        header: 'Detalles',
        width: '50vw',
        contentStyle: { overflow: 'auto' },
        breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
        },

        data:{
    
           book: this.book

        }

    });

    this.ref.onClose.subscribe((data: any) => {
       
    });

    this.ref.onMaximize.subscribe((value) => {
        this.messageService.add({ severity: 'info', summary: 'Maximized', detail: `maximized: ${value.maximized}` });
    });
}

ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
}

}
