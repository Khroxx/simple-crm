import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogActions, MatDialogClose, MatDialogContent, 
  MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { FirebaseService } from '../firebase-service/firebase.service';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [MatDialogModule, MatInputModule, FormsModule, MatFormFieldModule, MatButtonModule, 
    MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatIconModule, 
    MatDatepickerModule, MatProgressBarModule, CommonModule],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  loading = false;
  user = new User();
  userId: string | any;
  birthDate: Date | any;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firebaseService: FirebaseService) {

  }

  onNoClick(){
    this.dialogRef.close();
  }

  saveUser(){
    this.loading = true;
    if (this.userId){
      this.firebaseService.updateUser(this.userId, this.user).then(() => {
        // console.log('User updated', this.user);
        setTimeout(() => {
          this.loading = false;
          this.dialogRef.close();
        }, 1000);
      });
    }
  } 
}
