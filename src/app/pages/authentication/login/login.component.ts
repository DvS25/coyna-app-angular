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
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    constructor(
        private service: UserService,
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        private router: Router,
        private constants: Constants,
        private browser: BrowserDB
    ) {
    }

    // @ts-ignore
    loginForm: FormGroup;
    submitted = false;
    passwordType: string = 'password'
    setRemember: boolean = true;
    // @ts-ignore
    loginMobileForm: FormGroup;

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group(
            {
                userName: ['', [Validators.required]],
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(40)
                    ]
                ],
            },
        );
        if (this.browser.getLocalStorage('cdk') !== null) {
            this.loginForm.controls['password'].setValue(this.browser.getLocalStorage('cdk').password)
            this.loginForm.controls['userName'].setValue(this.browser.getLocalStorage('cdk').user)
        }

        this.loginMobileForm = this.formBuilder.group(
            {
                phone_number: ['', [Validators.required]],
            },
        );

    }


    get f(): { [key: string]: AbstractControl; } {
        return this.loginForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.service.userLogin(this.loginForm.value).subscribe(
            res => {
                if (res.status == 200) {
                    const header = res.headers.get('Authorization');
                    this.notification.success('User logged in successfully');
                    this.browser.setLocalStorage(this.constants.SET_TOKEN, header)
                    this.browser.setLocalStorage(this.constants.SET_USER_RESPONSE, res.body)
                    let userData = this.browser.getLocalStorage(this.constants.SET_USER_RESPONSE);
                    if (userData?.companySettings) {
                        this.router.navigate(['/dashboard']);
                    }
                    else {
                        this.router.navigate(['/add-company']);
                    }
                    var userType = res.body.userType;
                    this.service.getPermissionListFromUserType(userType).subscribe(
                        ress => {
                            if (ress.code == 1) {
                                // @ts-ignore
                                this.browser.setLocalStorage(this.constants.SET_PERMISSION_RESPONSE, ress.results);
                                console.log("done");
                            }
                        }, err => {
                        })
                }
                if (this.setRemember) {
                    this.browser.setLocalStorage('cdk', {
                        password: this.loginForm.value.password,
                        user: this.loginForm.value.userName
                    })
                }
            }, error => {
            })
    }


    passwordVisibility(type: string) {
        if (type == 'password') {
            this.passwordType = 'text'
        } else {
            this.passwordType = 'password'
        }
    }

    RedirectToSignup(): void {
        this.router.navigate(['/Signup']);
    }


    RedirectToForgotPassword() {
        this.router.navigate(['/forgotpassword']);
    }

    RedirectToMobileVerify(): void {
        this.router.navigate(['/MobileVerification']);
    }

}
