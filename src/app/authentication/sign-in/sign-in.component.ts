import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../services/login-register.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public group: FormGroup;
  public loading: boolean = false;
  constructor(private fb: FormBuilder, private loginService: LoginRegisterService, private route: Router) {
    this._createGroup();
  }

  protected _createGroup() {
    this.group = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
  }

  signIn() {
    this.loading = true;
    this.loginService.userSignIn(this.group.value).subscribe((res) => {
      if (res.success) {
        this.loading = false;
        this.route.navigateByUrl(`/dashboard/${res.username}`);
      }
      else {
        this.loading = false;
        alert(res.message);
      }
    })
  }

  navigateToSignUp() {
    this.route.navigateByUrl('/signUp');
  }

}
