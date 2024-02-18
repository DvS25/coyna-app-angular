import {Component, ElementRef, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddressHelper, BrowserDB, CompanyService, Constants, UtilityHelper} from "../../shared";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import Validation from "../../shared/directive/validation";
import { NgxSpinnerService } from "ngx-spinner";
import { CustomerService } from 'src/app/shared/service/apis/customer.service';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  showPage:boolean = true;
    // @ts-ignore
    customerForm: FormGroup;
    submitted = false;
    shippingCountry: string = '';
    billingCountry: string = '';
    storeList: any;
    // @ts-ignore
    departmentList = [{name: 'IT', value: 'it'}, {name: "Finance", value: 'finance'}]
    myDocs: string [] = [];
    companyList:any;
    iscustomer: boolean = false
    sameAddress:boolean = false

    // @ts-ignore
    @ViewChild("fileInput", {static: false}) InputVar: ElementRef;
    shippingCityList: any;
    shippingStateList: any;
    billingStateList: any;
    billingCityList: any;
    billingCountryList: any;
    shippingCountryList: any;
    sameShippingAddress: boolean=false;

    constructor(
      private service: CompanyService,
      private customerService: CustomerService,
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
                this.billingCountryList = country
                this.shippingCountryList = country
            });
        this.getCompanies();
    }

    ngOnInit(): void {
        this.customerForm = this.formBuilder.group(
            {
                companyId:['', [Validators.required]],
                customerName: ['', [Validators.required, Validators.pattern(this.constants.REGEXP.charOnlyWithSpecialCharacters)]],
                address1_shipping: ['', [Validators.required]],
                address2_shipping: ['', [Validators.required]],
                street_shipping: ['', [Validators.required]],
                city_shipping: ['', [Validators.required]],
                country_shipping: ['', [Validators.required]],
                province_shipping: ['', [Validators.required]],
                address1_billing: ['', [Validators.required]],
                address2_billing: ['', [Validators.required]],
                street_billing: ['', [Validators.required]],
                city_billing: ['', [Validators.required]],
                country_billing: ['', [Validators.required]],
                province_billing: ['', [Validators.required]],
                store_id: [''],
                bankName: ['', [Validators.required, Validators.pattern(this.constants.REGEXP.charOnly)]],
                beneficiary: ['', [Validators.required, Validators.pattern(this.constants.REGEXP.charOnly)]],
                postal_shipping: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(6),
                        Validators.pattern(this.constants.REGEXP.alphanum)
                    ]
                ],
                postal_billing: [
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
                paymentCode: ['', [Validators.required]],
                currency: ['', [Validators.required]],
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

    copyBillingAddressToShipping(checked:any) {
        this.sameShippingAddress= checked;
        if(checked===true)
        {
            this.shippingStateList = this.billingStateList
            this.shippingCityList = this.billingCityList
          this.customerForm.patchValue({
            address1_shipping: this.customerForm.value.address1_billing,
            street_shipping: this.customerForm.value.street_billing,
            country_shipping: this.customerForm.value.country_billing,
            city_shipping: this.customerForm.value.city_billing,
            address2_shipping: this.customerForm.value.address2_billing,
            postal_shipping: this.customerForm.value.postal_billing,
            province_shipping: this.customerForm.value.province_billing
          });
        }
        else
        {
            
            this.customerForm.get('address1_shipping')?.reset()
            this.customerForm.get('street_shipping')?.reset()
            this.customerForm.get('country_shipping')?.reset()
            this.customerForm.get('city_shipping')?.reset()
            this.customerForm.get('address2_shipping')?.reset()
            this.customerForm.get('postal_shipping')?.reset()
            this.customerForm.get('province_shipping')?.reset()
        }
      }

      
    get f(): { [key: string]: AbstractControl; } {
        return this.customerForm.controls;
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
        console.log('>>>>>>>>', this.customerForm.controls)
        if (this.customerForm.invalid) {
            // Scroll to the first invalid element
            const firstInvalidElement = document.querySelector('.ng-invalid');
            if (firstInvalidElement) {
              firstInvalidElement.scrollIntoView({ behavior: 'smooth' });
            }
            this.notification.error("Kindly fill all the required details before submittingc")
            return;
          }
        console.log('>>>>>>>>', this.customerForm.value.store_id)

        const newObj = {
            'name': this.customerForm.get('customerName')?.value,
            'companyId':this.customerForm.get('companyId')?.value,
            'storeId': this.customerForm.get('store_id')?.value,
            'customerType': 'new',
            'address': 
            [
            {
                "address1": this.customerForm.get('address1_shipping')?.value,
                "address2": this.customerForm.get('address2_shipping')?.value,
                "street": this.customerForm.get('street_shipping')?.value,
                "city": this.customerForm.get('city_shipping')?.value,
                "province": this.customerForm.get('province_shipping')?.value,
                "country": this.customerForm.get('country_shipping')?.value,
                "postalCode": this.customerForm.get('postal_shipping')?.value,
                "addressType": "SHIPPING"
            },
            {
                "address1": this.customerForm.get('address1_billing')?.value,
                "address2": this.customerForm.get('address2_billing')?.value,
                "street": this.customerForm.get('street_billing')?.value,
                "city": this.customerForm.get('city_billing')?.value,
                "province": this.customerForm.get('province_billing')?.value,
                "country": this.customerForm.get('country_billing')?.value,
                "postalCode": this.customerForm.get('postal_billing')?.value,
                "addressType": "BILLING"
            }
            ],
            'contactInfo': {
                "contactName": this.customerForm.get('first_name')?.value + ' ' + this.customerForm.get('last_name')?.value,
                "contactNumber": this.customerForm.get('contact_phone_number')?.value,
                "emailId": this.customerForm.get('contact_email_id')?.value,
                "alternateContactNumber": this.customerForm.get('contact_alternative_number')?.value,
                "alternateEmailId": this.customerForm.get('contact_alternative_email')?.value,
            },
            'payment': {
                "paymentCode": this.customerForm.get('paymentCode')?.value,
                "paymentTerms": this.customerForm.get('payment')?.value,
                "paymentMode": this.customerForm.get('modeOfPayment')?.value,
                "currency": this.customerForm.get('currency')?.value,
            },
            'bankAccount': {
                "accountingNumber": this.customerForm.get('accountNo')?.value,
                "routingNumber": this.customerForm.get('IFSCCode')?.value,
                "bankName": this.customerForm.get('bankName')?.value,
                "beneficiaryName": this.customerForm.get('beneficiary')?.value
            }
        }
        this.customerService.createCustomer(newObj).subscribe(res=>{
            if(res.code==='1')
            {
                this.notification.success("Customer created successfully!")
            }
        })
    }

    getShippingStatesForCountry(val: any) {
        if (val.value == '') {
            this.notification.info('Please select country');
            this.shippingStateList.length = 0;
            this.shippingCityList.length = 0;
        } else {
            this.shippingCountry = val.value
            this.address.getState(val.value).then(response => {
                // @ts-ignore
                this.shippingStateList = response.states
            })
        }
    }

    getShippingCitiesForSelectedState(val: any) {
        if (val.value == '') {
            this.notification.info('Please select country');
            this.shippingCityList.length = 0;
        } else {
            this.address.getCity(val.value, this.shippingCountry).then(response => {
                this.shippingCityList = response
            })
        }
    }

    getBillingStatesForCountry(val: any) {
        if (val.value == '') {
            this.notification.info('Please select country');
        } else {
            this.billingCountry = val.value
            this.address.getState(val.value).then(response => {
                // @ts-ignore
                this.billingStateList = response.states
            })
        }
    }

    getBillingCitiesForSelectedState(val: any) {
        if (val.value == '') {
            this.notification.info('Please select country');
        } else {
            this.address.getCity(val.value, this.billingCountry).then(response => {
                this.billingCityList = response
            })
        }
    }

    customerUpload(id: any) {
       
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
        
    }

    goBack(){
        this.router.navigate(['customer-listing'])
    }


}
