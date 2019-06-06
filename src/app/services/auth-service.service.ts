import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user: Observable<firebase.User>;
  private isAuthenticatedSubject = new BehaviorSubject(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  error: string;



  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.isAuthenticatedSubject.next(true);

      })
      .catch(err => {
        this.isAuthenticatedSubject.next(false);
        this.error = 'Try sign in again or call admin for help';
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.isAuthenticatedSubject.next(false);
  }

}
