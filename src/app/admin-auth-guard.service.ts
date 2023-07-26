// import { Injectable } from '@angular/core';
// import {  RouterStateSnapshot } from '@angular/router';
// import { Observable, map, switchMap } from 'rxjs';
// import { AuthService } from './auth.service';
// import { UserService } from './user.service';


// @Injectable({
//   providedIn: 'root',
// })
// export class AdminAuthGuard    {
//   constructor(private auth: AuthService, private userService: UserService) {}

//   canActivate(route: any, state: RouterStateSnapshot):Observable<boolean> {
//     return this.auth.user$.pipe(
//       switchMap(async (user) => this.userService.get(user.uid)),
//       map(appUser => appUser.isAdmin))
  
//   }
// }




// import { Injectable } from '@angular/core';

// import { AuthService } from './auth.service';
// import { UserService } from './user.service';
// import { map, switchMap } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import { user } from '@angular/fire/auth';

// @Injectable({
//   providedIn: 'root',
// })
// export class AdminAuthGuard  {
//   constructor(private auth: AuthService, private userService: UserService) {}

//   canActivate(): Observable<boolean> {
//     return this.auth.user$.pipe(
//        switchMap(async (user) => this.userService.get(user.uid)),
      
//       map((appUser) => appUser.isAdmin)
    
    
//     );
//   }
// }




import { Injectable } from '@angular/core';
// import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard {
  constructor(private auth: AuthService, private userService: UserService) {}

  canActivate(): Observable<boolean | any> {
    return this.auth.appUser$.pipe(map((appUser) => appUser?.isAdmin));
  }
}