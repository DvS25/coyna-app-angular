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
    selector: 'app-edit-store',
    templateUrl: './edit-store.component.html',
    styleUrls: ['./edit-store.component.scss']
})

export class EditStoreComponent {
	showPage:boolean = true;
    // @ts-ignore
    editStoreForm: FormGroup;
    submitted: boolean = false;
    companyList: any;
    countryList: any;
    cityList: any;
    singleCountry: any;
    stateList: any;
    companyPId: string = ''

    constructor(
        private formBuilder: FormBuilder,
        private constants: Constants,
        private companyService: CompanyService,
        private address: AddressHelper,
        private notification: ToastrService,
        private router: Router,
        private _snap: ActivatedRoute,
		private utility: UtilityHelper
    ) {
        this.getCompanies();
        this.address.getCountry('all')
            .then(country => {
                this.countryList = country
            });
    }

    ngOnInit(): void {
		if (!this.utility.chkPagePermission('StoreManagement'))
		{
			this.showPage = false;
		}
		
        this.editStoreForm = this.formBuilder.group(
            {
                name: ['', [Validators.required]],
                gst: ['', [Validators.required]],
                parentCompanyId: ['', [Validators.required]],
                accountingNumber: ['', [Validators.required]],
                routingNumber: ['', [Validators.required]],
                // address: this.formBuilder.group({
                city: ['', [Validators.required]],
                province: ['', [Validators.required]],
                country: ['', [Validators.required]],
                address_1: ['', [Validators.nullValidator]],
                postalCode: ['', [Validators.nullValidator]],
                // }),
            },
        );
        this.getStoreDetails()
    }

    get f(): { [key: string]: AbstractControl; } {
        return this.editStoreForm.controls;
    }

    updateStore() {
        this.submitted = true
        if (this.editStoreForm.invalid) return;
        let newObj = {
            "parentCompanyId": this.editStoreForm.value.parentCompanyId,
            "name": this.editStoreForm.value.name,
            "gst": this.editStoreForm.value.gst,
            "bankAccount":
                {
                    "accountingNumber": this.editStoreForm.value.accountingNumber,
                    "routingNumber": this.editStoreForm.value.routingNumber
                },
            "address":
                {
                    "city": this.editStoreForm.value.city,
                    "province": this.editStoreForm.value.province,
                    "country": this.editStoreForm.value.country,
                    "address1": this.editStoreForm.value.address_1,
                    "postalCode": this.editStoreForm.value.postalCode
                }
        }

        this.companyService.updateCompanyDetails(this.companyPId, newObj)
            .subscribe(res => {
                if (res.code == '1') {
                    this.notification.success(res.message)
                    this.submitted = false;
                    this.getStoreDetails()
                }
            })
    }

    getCompanies() {
        this.companyService.getCompany().subscribe(res => {
            if (res) {
                this.companyList = res.results;
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

    goToBack() {
        this.router.navigate(['store-details', this.companyPId])
    }

    getStoreDetails() {
        this._snap.params.subscribe(param => {
            // @ts-ignore
            this.companyPId = param.id
            this.companyService.getCompanyDetails(this.companyPId).subscribe(res => {
                const val = res.results;
                this.selectCountry({value: val.address.country})
                this.selectState({value: val.address.province})
                this.editStoreForm.setValue({
                    name: val.name,
                    parentCompanyId: val.parentCompanyId,
                    gst: val.gst,
                    accountingNumber: val.bankAccount.accountingNumber,
                    routingNumber: val.bankAccount.routingNumber,
                    city: val.address.city,
                    province: val.address.province,
                    country: val.address.country,
                    address_1: val.address.address1,
                    postalCode: val.address.postalCode
                })
            })
        });
    }
}

