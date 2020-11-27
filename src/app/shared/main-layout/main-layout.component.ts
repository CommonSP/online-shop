import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  type = 'Phone';
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  setType(type){
    this.type = type;
    if(this.type !== 'cart'){
      this.router.navigate(['/'], {
        queryParams: {
          type: this.type
        }
      })
    }
  }
}
