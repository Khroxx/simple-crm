import { Component } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase.service';
import {
  MatDialogActions, MatDialogClose, MatDialogContent,
  MatDialogModule, MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [MatDialogModule, MatInputModule, FormsModule, MatFormFieldModule, MatButtonModule,
    MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatIconModule,
    MatDatepickerModule, MatProgressBarModule, CommonModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  user = new User();
  userId: string | any;
  loading = false;
  birthDate: Date | any;
  constructor(private firebaseService: FirebaseService, public dialogRef: MatDialogRef<DialogEditAddressComponent>) {

  }

  onNoClick() {
    this.dialogRef.close();
  }

  saveUser() {
    this.loading = true;
    if (this.userId) {
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
