import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  productName: string;
  products: Product[] = [];
  prSub: Subscription;
  rSub: Subscription;
  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit(): void{
    this.prSub = this.productServ.getAll().subscribe( products => {
      this.products = products;
    });
  }

  ngOnDestroy(): void{
    if (this.prSub){
      this.prSub.unsubscribe();
    }

    if (this.rSub){
      this.rSub.unsubscribe();
    }
  }

  remove(id){
   this.rSub =  this.productServ.remove(id).subscribe(() =>{
      this.products = this.products.filter(product => product.id !== id);
    });
  }
}
