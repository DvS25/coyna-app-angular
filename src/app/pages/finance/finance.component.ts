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
    selector: 'app-finance',
    templateUrl: './finance.component.html',
    styleUrls: ['./finance.component.scss']
})
export class FinanceComponent {
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
    financeForm: FormGroup;
    submitted = false;
    companyList: any;
    storeList: any;
	userTypeList: any = [];
	
    isUser: boolean = false;

    ngOnInit(): void {
		if (!this.utility.chkPagePermission('Finance'))
		{
			this.showPage = false;
		}
		
        this.getCompanies();
        this.financeForm = this.formBuilder.group(
            {
                cName: ['', [Validators.required]],
                userId: ['', [Validators.required, Validators.email]],
                userType: ['', [Validators.required]],
                name: ['', [Validators.required, Validators.pattern(this.constants.REGEXP.alphanumWithSpaceDot)]],
                password: ['', [Validators.required]],
                store_id: ['', [Validators.required]],
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
        return this.financeForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;
        console.log('finace Data', this.financeForm.controls)

        if (this.financeForm.invalid) {
            return;
        }
        this.checkUserName()
      const newObj =  {
        "companyId": this.financeForm.value.cName,
        "userType": this.financeForm.value.userType,
        "userFullName": this.financeForm.value.name,
        "contactNumber": this.financeForm.value.mobileNo,
        "emailId": this.financeForm.value.userId,
        "userName": this.financeForm.value.userId,
        "password": this.financeForm.value.password,
        "storeId": this.financeForm.value.store_id
      }
        this.service.addUsers(newObj).subscribe(
            res => {
                if (res.code == "1") {
                    this.submitted = false;
                    this.notification.success("User is created.");
                    this.financeForm.reset();
                }
            },
            error => {
                console.log('error', error)
            }
        )
    }

    getCompanies() {
        this.service.getCompany().subscribe(res => {
            this.companyList = res.results;
			this.getUserTypes();
        })
    }
	
	getUserTypes() {
        this.service.getUserTypeList().subscribe(res => {
            if (res.code == '1') {
                this.userTypeList = res.results;
            }
        })
    }

    getStoreList(val: any) {
        this.service.getStore(val.value).subscribe(res => {
            if (res) {
                this.storeList = res.results;
            }
        })
    }

    checkUserName() {
        const storeID = this.financeForm.value.store_id
        const companyID = this.financeForm.value.cName
        const userId = this.financeForm.value.userId
        this.service.isUserId(userId, companyID, storeID)
            .subscribe(res=> {
                if (res.results){
                    this.isUser = false
                    this.financeForm.controls['userId'].setErrors(null)
                }
                if (!res.results){
                    this.financeForm.controls['userId'].setErrors({ isAlready: true })
                    this.isUser = true
                }
            })
    }
    goBack(){
        this.router.navigate(['user-listing'])
    }

}
