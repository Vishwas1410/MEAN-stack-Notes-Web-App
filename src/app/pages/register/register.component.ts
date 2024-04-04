import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import {MatStepperModule} from '@angular/material/stepper';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [StepperModule,ReactiveFormsModule,MatStepperModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
