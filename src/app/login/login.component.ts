import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: any = FormGroup;

  constructor(
    private service: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private comser: CommonService
  ) {
    service.header_Check = false;
  }
  ngOnInit(): void {
    this.login = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get name() {
    return this.login.get('name');
  }
  get password() {
    return this.login.get('password');
  }
  loginSubmit(data: any) {
    this.router.navigate(['deals']);
  }
}
