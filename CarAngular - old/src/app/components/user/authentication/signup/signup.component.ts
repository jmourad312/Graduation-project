import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formGroup:FormGroup;

  constructor(private _formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({

      Name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      Email: ['', [Validators.required, Validators.email,]],
      Password: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
      Gender: ['', [Validators.required]],
      DateOfBirth: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]]
    });
  }

}
