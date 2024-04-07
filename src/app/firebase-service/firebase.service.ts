import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, collection, onSnapshot, DocumentData, addDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/user.class';
import { getFirestore } from "firebase/firestore";


@Injectable({
    providedIn: 'root'
  })

export class FirebaseService implements OnDestroy{
    unsubUsers;
    firestore: Firestore = inject(Firestore);
    

    constructor() {
        this.unsubUsers = this.getUsers();
    }

    getUsers(){
        return onSnapshot(this.userRef(), (list) => {
            list.forEach(element => {
              //console.log(element.data()); //GEHT
            })
          });
    }
    
    userRef(){
        return collection(this.firestore, 'users');
    }

    ngOnDestroy(): void{
        this.unsubUsers();
    }

    async addUser(user: User){
        await addDoc(this.userRef(), user);
    }

    // updateUser(user){
    //     const userDoc = doc(this.firestore, 'users', user.id);
    //     updateDoc(userDoc, user);
    // }

    // deleteUser(user){
    //     const userDoc = doc(this.firestore, 'users', user.id);
    //     deleteDoc(userDoc);
    // }

    // getUser(id){
    //     const userDoc = doc(this.firestore, 'users', id);
    //     return userDoc;
    // }

    // getUsers(){
    //     return this.users;
    // }

    // getFilteredUsers(search){
    //     const q = query(this.userCol, where('firstName', '==', search));
    //     return collectionData(q);
    // }
}
