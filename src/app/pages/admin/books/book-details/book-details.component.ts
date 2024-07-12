import { Component } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { BookEditComponent } from '../book-edit/book-edit.component';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [ToastModule, SpeedDialModule, ConfirmDialogModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
  providers: [MessageService, DialogService, ConfirmDialog],
})
export class BookDetailsComponent {
  items: MenuItem[] | undefined;

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.items = [
      {
        icon: 'pi pi-pencil',
        command: () => {
          this.showInfo();
        },
      },
      {
        icon: 'pi pi-refresh',
        command: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Update',
            detail: 'Data Updated',
          });
        },
      },
      {
        icon: 'pi pi-trash',
        command: () => {
          this.confirm2(event);
        },
      },
      {
        icon: 'pi pi-upload',
        routerLink: ['/fileupload'],
      },
      {
        icon: 'pi pi-external-link',
        target: '_blank',
        url: 'http://angular.io',
      },
    ];
  }

  showInfo() {
    this.dialogService.open(BookEditComponent, {
      header: 'Information',
      modal: true,
      dismissableMask: true,
      style: {
        width: '30%',
        height: '50%',
      },
    });
  }

  confirm2(event: Event  = new Event('')) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }
}
