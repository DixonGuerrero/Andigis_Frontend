import { Component } from '@angular/core';
import { IUser } from '../../../core/models/auth/user.interface';
import { CognitoService } from '../../../core/services/auth/cognito.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-settings-user',
  standalone: true,
  imports: [ButtonModule,ReactiveFormsModule,ProgressSpinnerModule],
  templateUrl: './settings-user.component.html',
  styleUrl: './settings-user.component.css'
})
export class SettingsUserComponent {

  user: IUser = {} as IUser;
  userEdit: FormGroup;
  loading = false;
  ref: DynamicDialogRef | undefined;

  constructor(
    private cognitoService: CognitoService,
    public messageService: MessageService,
    private dialogService: DialogService
  ) {
    this.userEdit = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      imagen: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.getUserInfo();
  }


  getUserInfo(): void {
    this.cognitoService.getUser().then((user) => {
      this.user = user.attributes;
      this.defaultDataUser();
    });
  }



  defaultDataUser(){
    this.userEdit.patchValue({
      name: this.user.name,
      email: this.user.email,
      imagen: this.user.picture      
    });
  
  }

  updateUser(){
    if(this.userEdit.invalid){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Campos vacios'});
      return;
    }

    this.user.name = this.userEdit.value.name;
    this.user.email = this.userEdit.value.email;
    this.user.picture = this.userEdit.value.imagen;


    this.cognitoService.updateUser(this.user).then(() => {
      this.messageService.add({severity:'success', summary: 'Exito', detail: 'Usuario actualizado'});
      this.getUserInfo();
    }).catch((error) => {
      this.messageService.add({severity:'error', summary: 'Error', detail: error.message});
    }
    );


    

  }
}
