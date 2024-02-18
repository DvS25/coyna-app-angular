import {Component, ViewChildren} from '@angular/core';
import {
    AbstractControl,
    FormBuilder, FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import {EmailValidatorDirective} from "../../../shared";
import Validation from "../../../shared/directive/validation";
import { UserService } from "../../../shared";
import { ToastrService } from 'ngx-toastr';
import { Constants } from "../../../shared";
import {Router} from "@angular/router";
import { BrowserDB } from "../../../shared";

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent {
    // @ts-ignore
    otpForm: FormGroup;
    // @ts-ignore
    createForm: FormGroup;
    submitted = false;
    passwordType = 'password';
    confirmPasswordType = 'password';
    registerDiv: boolean = true;
    formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
    verifyEmail:string = '';
    @ViewChildren('formRow') rows: any;
    constructor(

        private formBuilder: FormBuilder,
        private service: UserService,
        private toastr: ToastrService,
        private constant: Constants,
        private router: Router,
        private browser: BrowserDB
        // @ts-ignore
) {
        this.otpForm = this.toFormGroup(this.formInput)

    }

    toFormGroup(elements: any) {
        const group: any = {};
        // @ts-ignore
        elements.forEach(key => {
            group[key] = new FormControl('', Validators.required);
        });
        return new FormGroup(group);
    }
    keyUpEvent(event:any, index: any) {
        let pos = index;
        if (event.keyCode === 8 && event.which === 8) {
            pos = index - 1 ;
        } else {
            pos = index + 1 ;
        }
        if (pos > -1 && pos < this.formInput.length ) {
            this.rows._results[pos].nativeElement.focus();
        }

    }

    submitOtp() {
        const { input1, input2, input3, input4, input5, input6 } = this.otpForm.value;
        const val = input1.concat(input2, input3, input4, input5, input6);
        const request = {
            token: parseInt(val),
            email: this.verifyEmail,
            type: 'create'
        }
        this.service.tokenVerify(request).subscribe(
            data=> {
                if (data.type== 'Success') {
                    this.toastr.success(data.status, 'Login successfully');
                    this.browser.setLocalStorage(this.constant.SET_TOKEN, data.result.accessToken)
                    this.router.navigate(['/dashboard']);
                }
            },
            error=>{
                this.toastr.error(error);
            },
            ()=>{
            }
            )
    }

// {"type":"Success","method":"POST","timestamp":"Sat Apr 01 2023 00:08:13 GMT+0530 (India Standard Time)","message":"Token verify successfully","result":{"email":"himanshuxxx@yopmail.com","expiresIn":"1d","accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI3MjZiNDRkZjhmYzg0M2ZlNzMzZjMiLCJlbWFpbCI6ImhpbWFuc2h1eHh4QHlvcG1haWwuY29tIiwiaWF0IjoxNjgwMjg3ODkzLCJleHAiOjE2ODAzNzQyOTN9.Vn5eRFSG1reURSskAdf0dvV3eLrh6mzvBsKUEZ9tZ4E","isVerify":true}}

    ngOnInit(): void {
        this.createForm = this.formBuilder.group(
            {
                first_name: ['', [Validators.required,Validators.pattern('[-_a-zA-Z]*')]],
                last_name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(40)
                    ]
                ],
                // confirmPassword: ['', Validators.required],
                acceptTerms: [false, Validators.requiredTrue]
            },
            // {
            //     validators: [Validation.match('password', 'confirmPassword')]
            // }
        );

    }
    get f(): { [key: string]: AbstractControl; } {
        return this.createForm.controls;
    }
    public checkErrorUserForm = (controlName: string, errorName: string) => {
        console.log('dddd', this.createForm.controls[controlName].hasError(errorName))
        return this.createForm.controls[controlName].hasError(errorName);
    };
    onSubmit(): void {
        this.submitted = true;
        if (this.createForm.invalid) {
            return;
        }
        this.service.userRegister(this.createForm.value)
            .subscribe(
                data => {
                    if (data.type == 'Success'){
                        this.registerDiv = false;
                        this.toastr.success(data.status, data.message)
                        this.verifyEmail = data.result.email;
                    }
                },
                error => {
                    this.toastr.error(error)
                },
                ()=> {})
    }
    onReset(): void {
        this.submitted = false;
        this.createForm.reset();
    }

    passwordVisibility(type: string) {
        if (type == 'password') {
            if (this.passwordType == 'password') {
                this.passwordType = 'text'
            } else {
                this.passwordType = 'password'
            }
        }
        if (type == 'confirmPassword') {
            if (this.confirmPasswordType == 'password') {
                this.confirmPasswordType = 'text'
            } else {
                this.confirmPasswordType = 'password'
            }
        }
    }

}
