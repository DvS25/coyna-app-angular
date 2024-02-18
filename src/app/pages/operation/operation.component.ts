import {Component} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";
import {Constants} from "../../shared";
import {BrowserDB} from "../../shared";
import {CompanyService, UtilityHelper} from "../../shared";

@Component({
    selector: 'app-operation',
    templateUrl: './operation.component.html',
    styleUrls: ['./operation.component.scss']
})
export class OperationComponent {
    constructor(
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        private router: Router,
        private constants: Constants,
        private browser: BrowserDB,
        private service: CompanyService,
		private utility: UtilityHelper
    ) {
    }

	showPage:boolean = true;
    // @ts-ignore
    operationForm: FormGroup;
    submitted = false;
    companyList: any;
    storeList: any;
    companyID: string = ''
    storeID: string = '';
    isUser: boolean = false;


    ngOnInit(): void {
		if (!this.utility.chkPagePermission('Operation'))
		{
			this.showPage = false;
		}
		
        this.getCompanies();
        this.operationForm = this.formBuilder.group(
            {
                cName: ['', [Validators.required]],
                userId: ['', [Validators.required]],
                name: ['', [Validators.required, Validators.pattern(this.constants.REGEXP.alphanumWithSpaceDot)]],
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required]],
                store_id: ['', [Validators.required]],
                department: ['', Validators.required],
                mobileNo: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(10),
                        Validators.maxLength(12),
                        Validators.pattern(this.constants.REGEXP.number)
                    ]
                ],
            },
        );
    }


    get f(): { [key: string]: AbstractControl; } {
        return this.operationForm.controls;
    }

    onSubmit(): void {
        // console.log('finace Data', this.operationForm.controls)

        this.submitted = true;
        if (this.operationForm.invalid) {
            return;
        }
        // console.log('finace Data', this.operationForm.value)
        const newObj = {
            "companyId": this.operationForm.value.cName,
            "userFullName": this.operationForm.value.name,
            "contactNumber": this.operationForm.value.mobileNo,
            "emailId": this.operationForm.value.email,
            "userName": this.operationForm.value.userId,
            "password": this.operationForm.value.password,
            "storeId": this.operationForm.value.store_id,
            "department": this.operationForm.value.department
        }

        this.service.addOperation(newObj).subscribe(
            res => {
                if (res.code == "1") {
                    this.submitted = false;
                    this.notification.success(res.message);
                    this.operationForm.reset();
                    // window.location.reload()
                }
            },
            error => {
                console.log('erroor', error)
            }
        )
    }

    getCompanies() {
        this.service.getCompany().subscribe(res => {
            if (res) {
                this.companyList = res.results;
            }
        })
    }

    getStoreList(val: any) {
        this.companyID = val.value
        this.service.getStore(val.value).subscribe(res => {
            if (res) {
                this.storeList = res.results;
            }
        })
    }

    checkUserName(target?: any) {
        const storeID = this.operationForm.value.store_id
        const companyID = this.operationForm.value.cName
        this.service.isUserId(target.value, companyID, storeID)
            .subscribe(res=> {
                if (res.results){
                    this.isUser = false
                    this.operationForm.controls['userId'].setErrors(null)
                }
                if (!res.results){
                    this.operationForm.controls['userId'].setErrors({ isAlready: true })
                    this.isUser = true
                }
            })
    }
    goBack(){
        this.router.navigate(['operation-listing'])
    }

}
