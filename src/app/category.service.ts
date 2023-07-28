// import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/compat/database';

// @Injectable({
//   providedIn: 'root'
// })
// export class CategoryService {

//   constructor(private db: AngularFireDatabase) { }
  
//   getCategories() {
//     return this.db.list('/categories');
//   }
// }


import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  itemRef: any;
  constructor(private db: AngularFireDatabase) {}

  getCategories() {
    this.itemRef = this.db
      .list('/categories')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((c) => ({
            key: c.key,
            // ...c.payload.val()
          }));
          // console.log(changes)
        })
      );
    return this.itemRef;
  }
}