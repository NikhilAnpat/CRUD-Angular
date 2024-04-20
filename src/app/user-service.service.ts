import { Injectable } from '@angular/core';
import { UserInterface } from './user-interface';
import { AngularFirestore} from '@angular/fire/compat/firestore'
import { Observable , throwError , of} from 'rxjs';
import { from} from 'rxjs';
import {  catchError, switchMap , mergeMap } from 'rxjs/operators'; 



@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private firestore: AngularFirestore) { }

  // addUser(user: UserInterface){
  //   console.log("Add user Service")
  //   user.id = this.firestore.createId()
  //   return this.firestore.collection('User').doc(user.id).set(user); 
  // }

  addUser(user: UserInterface): Observable<void> {
    console.log("Add user Service");
    return this.firestore.collection<UserInterface>('User', ref => ref.where('userregistration', '==', user.userregistration)).get().pipe(
      switchMap(snapshot => {
        if (!snapshot.empty) {
          alert('Registration number already exists')
          return throwError('Registration number already exists');
        } else {
          user.id = this.firestore.createId();
          return this.firestore.collection('User').doc(user.id).set(user);
        }
      }),
      catchError(error => {
        console.error('Error adding user:', error);
        return throwError(error);
      })
    );
  }

  getAllUsers(): Observable<UserInterface[]> {
    return this.firestore.collection<UserInterface>('User').valueChanges();
  }

  deleteUser(id: string): Observable<void> {
    console.log("Delete user Service");  
    return from(this.firestore.collection('User').doc(id).delete());
  }
  
  // deleteUser(id: string) {
  //   console.log("Delete user Service");  
  //   this.firestore.collection('User').doc(id).delete()
  // }

  // updateUserData(id: string, newData: Partial<UserInterface>): Observable<void> {
  //   console.log("Update Data Service");
  //   return from(this.firestore.collection('User').doc(id).update(newData));
  // }

  updateUserData(id: string, newData: Partial<UserInterface>): Observable<void> {
    console.log("Update Data Service");
    console.log("Updating data for ID:", id);
    console.log("New data:", newData);
  
    return from(this.firestore.collection('User').doc(id).update(newData));
  }

  
  
  
}
