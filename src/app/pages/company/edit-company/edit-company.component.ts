import {Component} from '@angular/core';
import {
  AbstractControl, FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from "@angular/router";
import {Constants, CompanyService, UtilityHelper} from "../../../shared";
import {AddressHelper} from "../../../shared";

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent {
  constructor(
      private service: CompanyService,
      private formBuilder: FormBuilder,
      private notification: ToastrService,
      private router: Router,
      private constants: Constants,
      private address: AddressHelper,
      private  _snap: ActivatedRoute,
	  private utility: UtilityHelper
  ) {

  }
	showPage:boolean = true;
  // @ts-ignore
  editCompanyForm: FormGroup;
  submitted = false;
  countryList: any;
  stateList: any;
  cityList:any;
  singleCountry: string = '';
  _id: string = '';

  ngOnInit(): void {
		if (!this.utility.chkPagePermission('CompanyManagement'))
		{
			this.showPage = false;
		}
		
    this.address.getCountry('all')
        .then(country => {
          this.countryList = country
        });
    this.editCompanyForm = this.formBuilder.group(
        {
          companyName: ['', [Validators.required]],
          mobileNumber: [
            '',
            [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(12),
              Validators.pattern(this.constants.REGEXP.number)
            ]
          ],
          typeOfService: ['', [Validators.required]],
          city: ['', [Validators.required]],
          country: ['', [Validators.required]],
          // addStoreName: this.formBuilder.array([]),
          // storeName: ['', [Validators.required]],
          accountNumber: ['', [Validators.required, Validators.pattern(this.constants.REGEXP.number)]],
          personName: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          address: ['', [Validators.required]],
          province: ['', [Validators.required]],
          gst: ['', [Validators.required]],
          routingNumber: ['', [Validators.required]],
          description: ['', [Validators.required]],
        },
    );
    this.getCompanyDetails()
  }

  get f(): { [key: string]: AbstractControl; } {
    return this.editCompanyForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log('controls....>>', this.editCompanyForm.controls)
    if (this.editCompanyForm.invalid) return;
    const obj  = {
      "name": this.editCompanyForm.value.companyName ,
      "companyType": this.editCompanyForm.value.typeOfService ,
      "gst": this.editCompanyForm.value.gst,
      "memo": this.editCompanyForm.value.description,
      "address": {
        "address1": this.editCompanyForm.value.address,
        "city": this.editCompanyForm.value.city,
        "province": this.editCompanyForm.value.province,
        "country": this.editCompanyForm.value.country
      },
      "contactInfo": {
        "contactName": this.editCompanyForm.value.personName,
        "contactNumber": this.editCompanyForm.value.mobileNumber,
        "emailId": this.editCompanyForm.value.email,
      },
      "bankAccount": {
        "accountingNumber": this.editCompanyForm.value.accountNumber,
        "routingNumber": this.editCompanyForm.value.routingNumber,
      },
    };
    this.service.updateCompanyDetails(this._id,obj)
        .subscribe((res) => {
          if (res.code == '1') {
            this.submitted = false
            this.notification.success('Company is update successfully')
            this.editCompanyForm.reset();
            window.location.reload();
          }
        })
  }


  // addStoreName(): void {
  //   (this.editCompanyForm.get('addStoreName') as FormArray).push(
  //       this.formBuilder.control(null)
  //   );
  // }
  //
  // removeStoreName(index:any) {
  //   (this.editCompanyForm.get('addStoreName') as FormArray).removeAt(index);
  // }
  //
  // getStoreFormControls(): any {
  //   return (<FormArray> this.editCompanyForm.get('addStoreName')).controls
  // }

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

  getCompanyDetails () {
    this._snap.params.subscribe(params => {
      // @ts-ignore
      this._id = params.id;
      // @ts-ignore
      this.service.getCompanyDetails(params.id).subscribe(res=> {
        if (res.code == '1') {
          const val = res.results;
          this.selectCountry({value:val.address.country});
          this.selectState({value:val.address.province});
          this.editCompanyForm.setValue({
            companyName : val.name,
            mobileNumber: val.contactInfo.contactNumber,
            typeOfService: val.companyType,
            city: val.address.city,
            country: val.address.country,
            accountNumber: val.bankAccount.accountingNumber,
            personName: val.contactInfo.contactName,
            email: val.contactInfo.emailId,
            address: val.address.address1,
            province: val.address.province,
            gst: val.gst,
            routingNumber: val.bankAccount.routingNumber,
            description: val.memo ,
          })
        }
      })
    })
  }
  goBack(){
    this.router.navigate(['company-detail', this._id])
  }
}