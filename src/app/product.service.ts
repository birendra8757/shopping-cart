import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  itemRef:any
  constructor(private db: AngularFireDatabase) {}

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll() {
     this.itemRef = this.db
       .list('products')
       .snapshotChanges()
       .pipe(
         map((changes) => {
           console.log(changes)
           return changes.map((c) => ({
             
             key: c.key,
            //  ...c.payload.val()
             
           })
           );
         })
     );
    // console.log(this.itemRef)
     return this.itemRef;
  }
//   getAll() {
//   return this.db.list('/products')
// }

  
}

