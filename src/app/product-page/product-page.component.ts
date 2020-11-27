import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../shared/interfaces';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product$: Observable<Product>;
  constructor(
    private productServ: ProductService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product$ = this.router.params
    .pipe(switchMap(params => {
      return this.productServ.getById(params.id);
    }));
  }
}
