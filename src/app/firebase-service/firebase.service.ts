import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, collection, onSnapshot, DocumentData, addDoc, doc, updateDoc, deleteDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/user.class';
import { getFirestore } from "firebase/firestore";


@Injectable({
    providedIn: 'root'
})

export class FirebaseService implements OnDestroy {
    unsubUsers;
    firestore: Firestore = inject(Firestore);
    user = new User();
    allUsers: any[] = [];

    constructor() {
        this.unsubUsers = this.getUsers();
    }

    getUsers() {
        return onSnapshot(this.userRef(), (list) => {
            this.allUsers = [];
            list.forEach(element => {
                let id = element.id;
                let data = element.data(); 
                let userData = { id, data };
                this.allUsers.push(userData);
            })
            
        });
    }

    userRef() {
        return collection(this.firestore, 'users');
    }

    singleUserRef(colId: string, userId: string) {
        return doc(collection(this.firestore, colId), userId);
    }

    ngOnDestroy(): void {
        this.unsubUsers();
    }

    async addUser(user: User) {
        await addDoc(this.userRef(), user.toJSON());
    }

    async updateUser(userId: string, updatedUser: User){
        let singleUserRef = doc(this.userRef(), userId);
        await updateDoc(singleUserRef, updatedUser.toJSON());
    }

    getCleanJson(user: User):{}{
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.birthDate,
            street: user.street,
            zipCode: user.zipCode,
            city: user.city,
            // id: user.id
        }
    }

    async loadUser(userId: string) {
        this.singleUserRef('users', userId);
        // const singleUserRef = doc(this.userRef(), userId);
        // const docSnap = await getDoc(singleUserRef);
        // if (docSnap.exists()) {
        //     this.user = docSnap.data() as User;
        // }
    }
    // setUserObject(obj: any, id: string): User{
    //     return {
    //         id: id,
    //         firstName: obj.firstName,
    //         lastName: obj.lastName,
    //         birthDate: obj.birthDate,
    //         street: obj.street,
    //         zipCode: obj.zipCode,
    //         city: obj.city,
    //     }
    // }

    async deleteUser(userId: string) {
        try {
            await deleteDoc(doc(this.firestore, "users", userId));
            console.log("User deleted successfully.");
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }
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
