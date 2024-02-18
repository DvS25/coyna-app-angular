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
import { NgOtpInputModule } from 'ng-otp-input';


@Component({
    selector: 'app-mobile-verification',
    templateUrl: './mobile-verification.component.html',
    styleUrls: ['./mobile-verification.component.scss']
})
export class MobileVerificationComponent {
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
    MobileVerificationForm: FormGroup;
    submitted = false;
    passwordType: string = 'password'
    setRemember: boolean = true;
    otpConfig: any;

    ngOnInit(): void {
        this.MobileVerificationForm = this.formBuilder.group(
            {
                verification_code: ['', [Validators.required]],
            },
        );
    }


    get f(): { [key: string]: AbstractControl; } {
        return this.MobileVerificationForm.controls;
    }





    RedirectToSignup(): void {
        this.router.navigate(['/Signup']);
    }

}
