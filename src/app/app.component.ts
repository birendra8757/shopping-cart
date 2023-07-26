import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
// import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import { User } from '@angular/fire/auth';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, router: Router)  {
     this.auth.user$.subscribe((user:any)=> {
       if (user) {
         this.userService.save(user);
         
        let returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) { 
          router.navigateByUrl(returnUrl);
        }

        
      }
    });
    
  }
}

