import { Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from './interfaces';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], productName = ''): any {
    if (!productName.trim()){
      return products;
    }
    return products.filter(product => {
      return product.title.toLowerCase().includes(productName.toLowerCase());
    });
  }

}
