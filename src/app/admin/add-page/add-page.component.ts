import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';


@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  submitted = false;
  form: FormGroup;

  constructor(private productServ: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new  FormGroup({
      type: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      photo: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
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
      const product = {
        title: this.form.value.title,
        type: this.form.value.type,
        photo: this.form.value.photo,
        info: this.form.value.info,
        price: this.form.value.price,
        date: new Date(),
      };
      this.productServ.create(product).subscribe(res => {
        this.form.reset();
        this.submitted = false;
        this.router.navigate(['/']);

      });
    }
  }

}
