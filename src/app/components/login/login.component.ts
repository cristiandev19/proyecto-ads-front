import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'cs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    let obj = {
      email: ['', Validators.required],
      password: ['', Validators.required],
    }
    return this.fb.group(obj);
  }

  handleLogin() {
    const form = this.loginForm.value;
    const usuario = {
      ...form,
      isLoged: true
    }
    localStorage.setItem('user', JSON.stringify(usuario));
    this.router.navigate(['/admin/emitir-nota'])
  }
}
