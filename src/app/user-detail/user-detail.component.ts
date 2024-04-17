import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase-service/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.class';
import { doc, getDoc, onSnapshot } from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  userId: string | any;
  user: User = new User();
  // unsubGetUser;


  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService,
     public dialog: MatDialog) {
    // this.unsubGetUser = this.getUser();
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    // console.log(this.userId); geht
    this.getUser(this.userId);
  }

  async getUser(userId: any) {
    return onSnapshot(this.firebaseService.singleUserRef('users', userId), (doc) => {
      this.user = doc.data() as User;
    });
  }

  ngondDestroy() {
    // this.getUser();
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;
  }
}

