import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/shared/interfaces';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  submitted = false;
  product: Product;
  form: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private productServ: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        return this.productServ.getById(params.id);
      })
    ).subscribe(product => {
      this.product = product;
      this.form = new FormGroup({
        type: new FormControl(this.product.type , Validators.required),
        title: new FormControl(this.product.title, Validators.required),
        photo: new FormControl(this.product.photo, Validators.required),
        info: new FormControl(this.product.info, Validators.required),
        price: new FormControl(this.product.price, Validators.required),
      });
    });
  }
  submit(): void{
    if (this.form.invalid)
    {
      return;
    }
    else
    {
      this.submitted = true;
      this.productServ.update({
        ...this.product,
        title: this.form.value.title,
        type: this.form.value.type,
        photo: this.form.value.photo,
        info: this.form.value.info,
        price: this.form.value.price,
        date: new Date(),
      }).subscribe(res => {
        this.submitted = false;
        this.router.navigate(['/admin', 'dashboard']);
      });
    }
  }
}
