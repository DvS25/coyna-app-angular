import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';

import { UserService } from "../../../shared";
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { Constants } from "../../../shared";
import Swal from 'sweetalert2';
import { BrowserDB } from "../../../shared";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
    constructor(
        private service: UserService,
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        private router: Router,
        private constants: Constants,
        private browser: BrowserDB,
        private toastr: ToastrService,
    ) {
    }

    // @ts-ignore
    SignupForm: FormGroup;
    submitted = false;
    passwordType: string = 'password'
    setRemember: boolean = true;
    IsCorrect: boolean = false;

    ngOnInit(): void {
        this.SignupForm = this.formBuilder.group(
            {
                name: ['', [Validators.required]],
                emailId: ['', [Validators.required]],
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(40)
                    ]
                ],
                confirmpassword: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(40)
                    ]
                ],
            },
        );
    }


    get f(): { [key: string]: AbstractControl; } {
        return this.SignupForm.controls;
    }

    ConfirmedPassword() {
        let NewPassword = this.SignupForm.get('password')?.value;
        let ConfirmPassword = this.SignupForm.get('confirmpassword')?.value;
        if (NewPassword == ConfirmPassword) {
            this.IsCorrect = true;
        }
        else {
            this.IsCorrect = false;
        }
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.SignupForm.invalid) {
            return;
        }
        if (this.IsCorrect) {
            let data: any = {};
            data['name'] = this.SignupForm.get('name')?.value;
            data['password'] = this.SignupForm.get('confirmpassword')?.value;
            data['emailId'] = this.SignupForm.get('emailId')?.value;
            this.service.userRegister(data).subscribe(
                res => {
                    if (res.code == 1) {
                        // const header = res.headers.get('Authorization');
                        this.notification.success('sign up completed successfully');
                        this.router.navigate(['/login']);
                    }
                    if (this.setRemember) {
                        this.browser.setLocalStorage('cdk', {
                            password: this.SignupForm.value.password,
                            user: this.SignupForm.value.userName
                        })
                    }
                }, error => {
                })
        }
        else {
            this.toastr.error("Confirm password is invalid")
        }
    }

    RedirectToLogIn() {
        this.router.navigate(['/login']);
    }

    SendOTP() {

    }


}
