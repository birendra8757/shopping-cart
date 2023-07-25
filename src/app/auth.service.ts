import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | any>;
  // userData: any;

  constructor(private afAuth: AngularFireAuth , private route:ActivatedRoute) {
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
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user == null) {
      return false;
    } else {
      return true;
    }
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  // SignOut() {
  //   return this.afAuth.signOut().then(() => {
  //     localStorage.removeItem('user');
  //     this.router.navigate(['sign-in']);
  //   });
  // }
}
