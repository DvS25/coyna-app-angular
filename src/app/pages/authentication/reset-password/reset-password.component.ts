import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  ResetPasswordData: any = {};
  // @ts-ignore
  ResetForm: FormGroup;
  submitted = false;
  IsCorrect: boolean = false;
  Token: any;
  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.Token = params.get('id');
    })
    this.ResetForm = this.formBuilder.group(
      {
        newPassword: ['', [Validators.required]],
        confirmpassword: ['', [Validators.required]]
      },
    );

  }

  get f(): { [key: string]: AbstractControl; } {
    return this.ResetForm.controls;
  }


  ResetPassword() {
    this.submitted = true;
    if (this.ResetForm.invalid) {
      return;
    }
    if (this.IsCorrect) {
      let data: any = {};
      data['token'] = this.Token;
      data['password'] = this.ResetForm.get('confirmpassword')?.value;
      this.service.ResetPassword(data).subscribe(
        data => {
          if (data.type == 'Success') {
            this.toastr.success(data.message)
          }
        },
        error => {
          this.toastr.error(error);
        }
      )
    }
    else {
      this.toastr.error("Confirm password is invalid")
    }
  }

  ConfirmedPassword() {
    let NewPassword = this.ResetForm.get('newPassword')?.value;
    let ConfirmPassword = this.ResetForm.get('confirmpassword')?.value;
    if (NewPassword == ConfirmPassword) {
      this.IsCorrect = true;
    }
    else {
      this.IsCorrect = false;
    }
  }


  RedirectToLogin(): void {
    this.router.navigate(['/login']);
  }


}
