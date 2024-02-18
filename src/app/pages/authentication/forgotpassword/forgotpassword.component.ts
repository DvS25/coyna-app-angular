import { Component, ViewChildren } from '@angular/core';
import { ApiService } from 'src/app/shared/service';
import {
  AbstractControl,
  FormBuilder, FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import Validation from "../../../shared/directive/validation";
import { UserService } from "../../../shared";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  forGotDiv: boolean = true;
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  otpForm: FormGroup;
  @ViewChildren('formRow') rows: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.otpForm = this.toFormGroup(this.formInput)

  }

  // @ts-ignore
  forgotForm: FormGroup;
  submitted = false;
  passwordType: string = 'password'

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group(
      {
        emailId: ['', [Validators.required, Validators.email]],
      },
    );

  }
  get f(): { [key: string]: AbstractControl; } {
    return this.forgotForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.forgotForm.invalid) {
      return;
    }

    this.service.forgotPassword(this.forgotForm.value).subscribe(
      data => {
        if (data.type == 'Success') {
          this.forGotDiv = false;
          this.toastr.success(data.message)
        }
      },
      error => {
        this.toastr.error(error);
      }
    )

    console.log(JSON.stringify(this.forgotForm.value, null, 2));
  }

  toFormGroup(elements: any) {
    const group: any = {};
    // @ts-ignore
    elements.forEach(key => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }
  keyUpEvent(event: any, index: any) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else {
      pos = index + 1;
    }
    if (pos > -1 && pos < this.formInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }
  }

  submitOtp() {
    const { input1, input2, input3, input4, input5, input6 } = this.otpForm.value;
    const val = input1.concat(input2, input3, input4, input5, input6);
    const request = {
      token: parseInt(val),
      email: this.forgotForm.value.email,
      type: 'forgot'
    }
    this.service.tokenVerify(request).subscribe(
      data => {
        if (data.type == 'Success') {
          this.toastr.success(data.staus, data.message);
          this.router.navigate(['/'])
        }
      },
      error => {
        this.toastr.error(error);
      },
      () => {
      }
    )
  }

  TryAnotherWay() {

  }




}
