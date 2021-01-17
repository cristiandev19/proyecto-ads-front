import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cs-restart-password',
  templateUrl: './restart-password.component.html',
  styleUrls: ['./restart-password.component.scss']
})
export class RestartPasswordComponent implements OnInit {
  restartForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.restartForm = this.createForm(); 

  }

  ngOnInit(): void { }

  createForm() {
    let obj = {
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
    }
    return this.fb.group(obj);
  }
}
