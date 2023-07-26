import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs';

// import {User} from '@angular/fire/auth';

// import firebase from '@firebase/app';
// import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$;
  // userData: any;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute,private userService:UserService) {
    this.user$ = afAuth.authState;
    // set logged in user in localstorage else null
    //   this.user$.subscribe((user) => {
    //     if (user) {
    //       this.userData = user;
    //       localStorage.setItem('user', JSON.stringify(this.userData));
    //       JSON.parse(localStorage.getItem('user')!);
    //     } else {
    //       localStorage.setItem('user', 'null');
    //       JSON.parse(localStorage.getItem('user')!);
    //     }
    //   });
  }

  // Returns true when user is loged in and verify
  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user')!);
  //   if (user == null) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser | null> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) return this.userService.get(user.uid).valueChanges();
        return of(null);
      })
    );
  }
}
