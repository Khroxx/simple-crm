import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions,
   MatDialogClose,
   MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { User } from '../../../models/user.class';
// import { Firestore, collection, collectionData, onSnapshot } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
import { FirebaseService } from '../../firebase-service/firebase.service';
import { Firestore } from '@angular/fire/firestore';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [MatDialogModule, MatInputModule, FormsModule, MatFormFieldModule, MatButtonModule, 
    MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatIconModule, 
    MatDatepickerModule, MatProgressBarModule, CommonModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);
  loading = false;

  constructor(private firebaseService: FirebaseService, public dialogRef: MatDialogRef<DialogAddUserComponent>) {

  }

  onNoClick(){

  }

  saveUser(){
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;
    // console.log('Current User: ', this.user);
    let user: User =    {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      birthDate: this.user.birthDate,
      street: this.user.street,
      zipCode: this.user.zipCode,
      city: this.user.city
    }
    this.firebaseService.addUser(user);
    

    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close();
    }, 3000);
  } 
  }


