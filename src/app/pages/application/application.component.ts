import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent {

  firstGroupForm!: FormGroup;
  secondGroupForm!: FormGroup;

  applicationForm!: FormGroup;

  readonly announcer = inject(LiveAnnouncer);
  readonly workTimes = signal<String[]>(['Lundi Matin', 'Mardi soir']);
  readonly separatorKeysCodes = [ENTER, COMMA] as const;


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
      isStudent: [null, [Validators.required]]
    })

    this.secondGroupForm = this.formBuilder.group({
      hoursPerWeeks: [null, [Validators.required]],
      workingDays: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirm: [null, [Validators.required]]
    })

    this.applicationForm = this.formBuilder.group({
      first: this.firstGroupForm,
      second: this.secondGroupForm
    })
  }

  remove(workTime: String): void {
    this.workTimes.update(workTimes => {
      const index = workTimes.indexOf(workTime);
      if (index < 0) {
        return workTimes;
      }

      workTimes.splice(index, 1);
      this.announcer.announce(`Removed ${workTime}`);
      return [...workTimes];
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.workTimes.update(workTimes => [...workTimes, value]);
    }

    event.chipInput!.clear();
  }

}
