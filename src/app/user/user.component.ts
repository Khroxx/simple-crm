import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FirebaseService } from '../firebase-service/firebase.service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.class';
import { Firestore, updateDoc } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, 
    DialogAddUserComponent, MatDatepickerModule, MatCardModule, CommonModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  // user = new User();
  // allUsers: User[] = [];
  // user = this.firebaseService.user;
  // allUsers = this.firebaseService.allUsers;
  userId!: string;

  constructor(public dialog: MatDialog, private firebaseService: FirebaseService, public firestore: Firestore) {
    
  }

  ngOnInit(){
    this.usersFromService()
    // console.log(this.usersFromService());
    // console.log(this.firebaseService.getUsers());
    // this.firebaseService.unsubUsers();
    // this.firebaseService.updateUser();
    // this.allUsers = this.user;
    // console.log(this.firebaseService.updateUser())

    // this.allUsers.push(this.user);
    // console.log(this.firebaseService.unsubUsers());
    // console.log('changed:', this.firebaseService.);
  }

  // saveUser(){
  //   this.firebaseService.updateUser(this.user);
  // }
  usersFromService(){
    return this.firebaseService.allUsers;
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
