import {Component, ElementRef, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddressHelper, BrowserDB, CompanyService, Constants, UtilityHelper} from "../../../shared";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import Validation from "../../../shared/directive/validation";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
    selector: 'app-edit-vendor',
    templateUrl: './edit-vendor.component.html',
    styleUrls: ['./edit-vendor.component.scss']
})
export class EditVendorComponent {
	showPage:boolean = true;
    // @ts-ignore
    editVendorForm: FormGroup;
    submitted = false;
    countryList: any;
    stateList: any;
    cityList: any;
    singleCountry: string = '';
    storeList: any;
    selectedCompanyId:string='';
    routeId:any;

    // @ts-ignore
    departmentList = [{name: 'IT', value: 'it'}, {name: "Finance", value: 'finance'}]
    myDocs: string [] = [];
    companyList: any;

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
        private spinner: NgxSpinnerService,
        private _snap: ActivatedRoute,
    ) {
        this.address.getCountry('all')
            .then(country => {
                this.countryList = country
            });
        this.getCompanies();
        this.getVendorDetails();
    }

    ngOnInit(): void {
		if (!this.utility.chkPagePermission('VendorManagement'))
		{
			this.showPage = false;
		}
		
        this.editVendorForm = this.formBuilder.group(
            {
                companyId: ['', [Validators.required]],
                companyName: ['', [Validators.required, Validators.pattern(this.constants.REGEXP.charOnly)]],
                street: ['', [Validators.required]],
                province: ['', [Validators.required]],
                city: ['', [Validators.required]],
                store_id: ['', [Validators.required]],
                country: ['', [Validators.required]],
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
                        Validators.minLength(5),
                        Validators.maxLength(20),
                        Validators.pattern(this.constants.REGEXP.number)
                    ]
                ],
                reAccountNo: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(20),
                        Validators.pattern(this.constants.REGEXP.number),

                    ]
                ],
                cvd_1: [''],
                gst: [''],
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
        return this.editVendorForm.controls;
    }

    onFileSelected(event: any, type: string) {
        if (event.target.files[0] !== undefined) {
            if (this.utility.fileSize(event.target, '60 KB'))
                for (let i = 0; i < event.target.files.length; i++) {
                    this.myDocs.push(event.target.files[i]);
                }
        }
    }

    onSubmit(): void {
        this.submitted = true;
        console.log('>>>>>>>>', this.editVendorForm.controls)
        if (this.editVendorForm.invalid) return;
        const newObj = {
            'name': this.editVendorForm.get('companyName')?.value,
            "companyId": this.editVendorForm.get('companyId')?.value,
            'vendorType': 'new',
            'gst': this.editVendorForm.get('gst')?.value,
            'department': this.editVendorForm.get('department')?.value,
            'language': this.editVendorForm.get('language')?.value,
            'storeId': this.editVendorForm.get('store_id')?.value,
            'address': {
                "street": this.editVendorForm.get('street')?.value,
                "city": this.editVendorForm.get('city')?.value,
                "province": this.editVendorForm.get('province')?.value,
                "country": this.editVendorForm.get('country')?.value,
                "postalCode": this.editVendorForm.get('postalCode')?.value
            },
            'contactInfo': {
                // @ts-ignore
                "contactName": this.editVendorForm.get('first_name').value + ' ' + this.editVendorForm.get('last_name').value,
                // @ts-ignore
                "contactNumber": this.editVendorForm.get('contact_phone_number').value,
                // @ts-ignore
                "emailId": this.editVendorForm.get('contact_email_id').value,
                // @ts-ignore
                "alternateContactNumber": this.editVendorForm.get('contact_alternative_number').value,
                // @ts-ignore
                "alternateEmailId": this.editVendorForm.get('contact_alternative_email').value,
            },
            'payment': {
                // @ts-ignore
                "paymentCode": this.editVendorForm.get('paymentCode').value,
                // @ts-ignore
                "paymentTerms": this.editVendorForm.get('payment').value,
                // @ts-ignore
                "paymentMode": this.editVendorForm.get('modeOfPayment').value,
                // @ts-ignore
                "currency": this.editVendorForm.get('currency').value,
            },
            'bankAccount': {
                // @ts-ignore
                "accountingNumber": this.editVendorForm.get('accountNo').value,
                // @ts-ignore
                "routingNumber": this.editVendorForm.get('IFSCCode').value,
                // @ts-ignore
                "bankName": this.editVendorForm.get('bankName').value,
                // @ts-ignore
                "beneficiaryName": this.editVendorForm.get('beneficiary').value
            }
        }

        console.log(newObj)
        // @ts-ignore
        this.service.updateVendor(newObj, this.vendorId)
            .subscribe((res) => {
                if (res.code == '1') {
                    this.notification.success("Vendor Details Updated Successfully")
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
                if (response.code == '1') {
                    this.notification.success('Vendor is created successfully');
                    this.editVendorForm.reset();
                    this.submitted = false;
                    // window.location.reload()
                }
            })
    }

    getCompanies(): Promise<void> {
        return new Promise((resolve, reject) => {
          this.service.getCompany().subscribe(
            res => {
              if (res) {
                this.companyList = res.results;
                resolve();
              }
            },
            error => {
              reject(error);
            }
          );
        });
      }

    getStoreList(val: any) {
        this.service.getStore(val.value).subscribe(res => {
            if (res.code == '1') {
                this.storeList = res.results;
            }
        })
    }

    async getVendorDetails() {
        this._snap.params.subscribe(async params => {
            // @ts-ignore
            this.vendorId = params.id
            // @ts-ignore
            this.routeId = params.id
            await this.getCompanies();
            // @ts-ignore
            this.service.getVendorDetails(params.id).subscribe(res => {
                const val = res.results;
                console.log(">>>>>>??????",val)
                this.getStoreList({value:val.companyId});
                this.selectCountry({value: val.address.country})
                this.selectState({value:val.address.province})
                this.editVendorForm = this.formBuilder.group(
                    {
                        companyId: val.companyId,
                        companyName: val.name,
                        street: val.address.street,
                        province:val.address.province,
                        city: val.address.city,
                        country: val.address.country,
                        postal: val.address.postalCode,
                        bankName: val.bankAccount.bankName,
                        beneficiary: val.bankAccount.beneficiaryName,
                        accountNo: val.bankAccount.accountingNumber,
                        reAccountNo: val.bankAccount.accountingNumber,
                        IFSCCode: val.bankAccount.routingNumber,

                        // cvd_1: [''],
                        gst: val.gst,
                        // cvd_2: [''],

                        paymentCode: val.payment.paymentCode,
                        // companyGST: [''],
                        currency: val.payment.currency,
                        language: val.language,
                        payment: val.payment.paymentTerms,
                        modeOfPayment: val.payment.paymentMode,

                        contact_email_id: val.contactInfo.emailId,
                        first_name: val.contactInfo.contactName.split(' ')[0],
                        last_name: val.contactInfo.contactName.split(' ')[1],
                        contact_phone_number: val.contactInfo.contactNumber,
                        contact_alternative_number: val.contactInfo.alternateContactNumber,
                        contact_alternative_email: val.contactInfo.alternateEmailId,
                        store_id: val.storeId,

                    },
                    {
                        validators: [Validation.match('accountNo', 'reAccountNo')]
                    }
                );

            })
        })
    }

    goBack(){
        this.router.navigate(['vendor-details',this.routeId])
    }

}
