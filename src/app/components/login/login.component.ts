import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; 

  constructor(private fb: FormBuilder) { 
    
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
}
