import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submitted =  false;

  error = '';

  constructor(
    public auth: AuthService,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new  FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }
  submit(): void{
    if (this.form.invalid){
      return;
    }
    this.submitted = true;

    const user = {
      email : this.form.value.email,
      password : this.form.value.password,
      returnSecureToken: true
    };
    this.auth.login(user).subscribe(res => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, (error) => {
      if (error.error.error.message === 'EMAIL_NOT_FOUND'){
        this.error = 'Данного пользователя не существует';
      }
      else{
        this.error = 'Неверный пароль';
      }

      this.submitted = false;
    });

  }

}
