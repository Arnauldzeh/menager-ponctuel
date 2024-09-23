import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent {

  firstGroupForm!: FormGroup;
  secondGroupForm!: FormGroup;

  applicationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.initForms()
  }

  private initForms(): void{
    this.firstGroupForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      city: [null, [Validators.required]],
      quater: [null, [Validators.required]],
      field: [null, [Validators.required]],
      isStudend: [null, [Validators.required]]
    })

    this.secondGroupForm = this.formBuilder.group({
      hoursPerWeeks: [null, [Validators.required]],
      workingDays: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirm: [null, [Validators.required]]
    })

    this.applicationForm = this.formBuilder.group({
      first: this.firstGroupForm,
      second: this.secondGroupForm
    })
  }
}
