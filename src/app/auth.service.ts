import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, User } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | any>
  
  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    this.user$ = afAuth.authState;
 
  }

 

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser |any> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) return this.userService.get(user.uid).valueChanges();
        return of(null);
      })
    );
  }
}
