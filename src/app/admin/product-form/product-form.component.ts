import { Component } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  product:any = {};
  id;
  categories$;
  constructor(
    private router:Router,
    private route :ActivatedRoute,
   private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = this.categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    console.log("PRODUCT ID", this.id);
    // console.log(this.product)
    // Important line of code to get single product from firebase
    if(this.id) this.productService.get(this.id).valueChanges().
    pipe(take(1)).subscribe(p => this.product = p);
    
  }

  save(product: any) {
    // console.log(product)
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  // show(event: any) {
  //   console.log(event.target.value);
  // }
}
