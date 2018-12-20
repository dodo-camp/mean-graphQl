import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../services/login-register.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public group: FormGroup;
  constructor(private fb: FormBuilder, private loginService: LoginRegisterService, private route: Router) {
    this._createGroup();
  }

  protected _createGroup() {
    this.group = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required])
    })
  }

  ngOnInit() {
  }

  signUp() {
    this.loginService.userRegister(this.group.value).subscribe(this._getResponse.bind(this), this._errorHandle.bind(this));
  }

  protected _getResponse(response: any) {
    if (response.data.signUp.success)
      this.route.navigateByUrl('/signIn');
    else
      alert(response.data.signUp.message);
  }

  protected _errorHandle(err) {
    console.log(err);
  }

  navigateToSignIn() {
    this.route.navigateByUrl('/signIn');
  }

}
