import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm?: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder)

  constructor(

  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        'username': ['', Validators.required],
        'password': ['', Validators.required]
      }
    )
  }


}
