import {Component, ElementRef, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddressHelper, BrowserDB, CompanyService, Constants, UtilityHelper} from "../../shared";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import Validation from "../../shared/directive/validation";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    selector: 'app-vendor',
    templateUrl: './vendor.component.html',
    styleUrls: ['./vendor.component.scss']
})
export class VendorComponent {
	showPage:boolean = true;
    // @ts-ignore
    vendorForm: FormGroup;
    submitted = false;
    countryList: any;
    stateList: any;
    cityList: any;
    singleCountry: string = '';
    storeList: any;
    // @ts-ignore
    departmentList = [{name: 'IT', value: 'it'}, {name: "Finance", value: 'finance'}]
    myDocs: string [] = [];
    companyList:any;
    isVendor: boolean = false

    // @ts-ignore
    @ViewChild("fileInput", {static: false}) InputVar: ElementRef;

    constructor(
        private service: CompanyService,
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        private router: Router,
        private constants: Constants,
        private browser: BrowserDB,
        private address: AddressHelper,
        private utility: UtilityHelper,
        private spinner: NgxSpinnerService
    ) {
        this.address.getCountry('all')
            .then(country => {
                this.countryList = country
            });
        this.getCompanies();
    }

    ngOnInit(): void {
		if (!this.utility.chkPagePermission('VendorManagement'))
		{
			this.showPage = false;
		}
		
        this.vendorForm = this.formBuilder.group(
            {
                companyId:['', [Validators.required]],
                companyName: ['', [Validators.required, Validators.pattern(this.constants.REGEXP.charOnlyWithSpecialCharacters)]],
                street: ['', [Validators.required]],
                city: ['', [Validators.required]],
                country: ['', [Validators.required]],
                province: ['', [Validators.required]],
                store_id: ['', [Validators.required]],
                bankName: ['', [Validators.required, Validators.pattern(this.constants.REGEXP.charOnly)]],
                beneficiary: ['', [Validators.required, Validators.pattern(this.constants.REGEXP.charOnly)]],
                postal: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(6),
                        Validators.pattern(this.constants.REGEXP.alphanum)
                    ]
                ],
                accountNo: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(this.constants.REGEXP.number)
                    ]
                ],
                reAccountNo: [
                    '',
                    [
                        Validators.required,
                        Validators.pattern(this.constants.REGEXP.number),

                    ]
                ],
                cvd_1: ['', [Validators.required]],
                cGST: ['', [Validators.required]],
                cvd_2: [''],
                paymentCode: ['', [Validators.required]],
                companyGST: [''],
                currency: ['', [Validators.required]],
                language: ['', [Validators.required]],
                payment: ['', [Validators.required]],
                modeOfPayment: ['', [Validators.required]],
                contact_email_id: ['', [Validators.required, Validators.email]],
                contact_alternative_email: ['', [Validators.email]],
                IFSCCode: ['', [Validators.required]],
                first_name: ['', [Validators.required]],
                last_name: ['', [Validators.required]],
                contact_phone_number: ['', [Validators.required]],
                contact_alternative_number: ['', []],
            },
            {
                validators: [Validation.match('accountNo', 'reAccountNo')]
            }
        );
    }


    get f(): { [key: string]: AbstractControl; } {
        return this.vendorForm.controls;
    }

    onFileSelected(event: any, type: string) {
        if (event.target.files[0] !== undefined) {
            if (this.utility.fileSize(event.target, '16 MB'))
                for (let i = 0; i < event.target.files.length; i++) {
                    this.myDocs.push(event.target.files[i]);
                }
        }
    }

    onSubmit(): void {
        this.submitted = true;
        // this.spinner.show();
        console.log('>>>>>>>>', this.vendorForm.controls)
        if (this.vendorForm.invalid) {
            // Scroll to the first invalid element
            const firstInvalidElement = document.querySelector('.ng-invalid');
            if (firstInvalidElement) {
              firstInvalidElement.scrollIntoView({ behavior: 'smooth' });
            }
        
            return;
          }
        console.log('>>>>>>>>', this.vendorForm.value.store_id)

        const newObj = {
            'name': this.vendorForm.get('companyName')?.value,
            "companyId":this.vendorForm.get('companyId')?.value,
            'vendorType': 'new',
            'gst': this.vendorForm.get('cGST')?.value.toUpperCase(),
            'language': this.vendorForm.get('language')?.value,
            'storeId': this.vendorForm.get('store_id')?.value,
            'address': {
                "street": this.vendorForm.get('street')?.value,
                "city": this.vendorForm.get('city')?.value,
                "province": this.vendorForm.get('province')?.value,
                "country": this.vendorForm.get('country')?.value,
                "postalCode": this.vendorForm.get('postal')?.value
            },
            'contactInfo': {
                // @ts-ignore
                "contactName": this.vendorForm.get('first_name').value + ' ' + this.vendorForm.get('last_name').value,
                // @ts-ignore
                "contactNumber": this.vendorForm.get('contact_phone_number').value,
                // @ts-ignore
                "emailId": this.vendorForm.get('contact_email_id').value,
                // @ts-ignore
                "alternateContactNumber": this.vendorForm.get('contact_alternative_number').value,
                // @ts-ignore
                "alternateEmailId": this.vendorForm.get('contact_alternative_email').value,
            },
            'payment': {
                // @ts-ignore
                "paymentCode": this.vendorForm.get('paymentCode').value,
                // @ts-ignore
                "paymentTerms": this.vendorForm.get('payment').value,
                // @ts-ignore
                "paymentMode": this.vendorForm.get('modeOfPayment').value,
                // @ts-ignore
                "currency": this.vendorForm.get('currency').value,
            },
            'bankAccount': {
                // @ts-ignore
                "accountingNumber": this.vendorForm.get('accountNo').value,
                // @ts-ignore
                "routingNumber": this.vendorForm.get('IFSCCode').value,
                // @ts-ignore
                "bankName": this.vendorForm.get('bankName').value,
                // @ts-ignore
                "beneficiaryName": this.vendorForm.get('beneficiary').value
            }
        }
        this.service.addVendor(newObj)
            .subscribe((res) => {
                if (res.code == '1') {
                    this.vendorUpload(res.results);
                }
            })
    }

    selectCountry(val: any) {
        if (val.value == '') {
            this.notification.info('Please select country');
            this.stateList.length = 0;
            this.cityList.length = 0;
        } else {
            this.singleCountry = val.value
            this.address.getState(val.value).then(response => {
                // @ts-ignore
                this.stateList = response.states
            })
        }
    }

    selectState(val: any) {
        if (val.value == '') {
            this.notification.info('Please select country');
            this.cityList.length = 0;
        } else {
            this.address.getCity(val.value, this.singleCountry).then(response => {
                this.cityList = response
            })
        }
    }

    vendorUpload(id: any) {
        const formData = new FormData();
        for (let i = 0; i < this.myDocs.length; i++) {
            formData.append("documents", this.myDocs[i]);
        }
        this.service.vendorUpload(id, formData)
            .subscribe(response => {
                if (response.code == '1'){
                    this.notification.success('Vendor is created successfully');
                    this.vendorForm.reset();
                    this.submitted = false;
                    // window.location.reload()
                }
            })
    }

    getCompanies () {
        this.service.getCompany().subscribe(res=> {
            if (res) {
                this.companyList =  res.results;
            }
        })
    }
    getStoreList(val: any) {
        this.service.getStore(val.value).subscribe(res=> {
            if(res.code == '1') {
                this.storeList = res.results;
            }
        })
    }

    checkCompany(target?: any) {
        if (target.value.length > 2){
            const cId =  this.vendorForm.getRawValue().companyId
            const sId =   this.vendorForm.getRawValue().store_id

            this.service.isVendor(target.value, cId, sId).subscribe(res=> {
                if (res.results){
                    this.vendorForm.controls['companyName'].setErrors(null)
                    this.isVendor = false
                }
                if (!res.results){
                    this.vendorForm.controls['companyName'].setErrors({ isAlready: true })
                    this.isVendor = true
                }
            })
        } else {
            this.isVendor = false
        }
    }

    goBack(){
        this.router.navigate(['vendor-listing'])
    }

}
