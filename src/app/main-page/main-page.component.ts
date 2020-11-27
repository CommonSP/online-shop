import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private productServ: ProductService) { }
  products$: any;
  ngOnInit(): void {
    this.products$ = this.productServ.getAll();
  }

}
