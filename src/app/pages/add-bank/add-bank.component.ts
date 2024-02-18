import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, FormArray, Validators, AbstractControl} from '@angular/forms';
import {BrowserDB, CompanyService, Constants, InvoiceManagementService, blobFileDownload, unquieArray, UtilityHelper} from "../../shared";
import { ToastrService } from 'ngx-toastr';
import {AddressHelper} from "../../shared";
import { banks } from './bank-constants';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.scss']
})
export class AddBankComponent {
	showPage:boolean = true;
	companyList: any;
    storeList: any = [];
	countryList: any;
    stateList: any;
    cityList: any;
	formSubmitted: boolean = false;
    banks = banks
	
	addBankForm = this.formBuilder.group({
        bankName: ['', Validators.required],
        accountNumber: ['', Validators.required],
        routingNumber: ['', Validators.required],
        bankAddress: ['', Validators.required],
        companyId: ['', Validators.required],
        country: ['', Validators.required],
        province: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        openingBalance: ['', Validators.required],
    })
	
	constructor(
        private browserDB: BrowserDB,
        private constants: Constants,
        private formBuilder: FormBuilder,
        private companyService: CompanyService,
		private toastr: ToastrService,
		private utility: UtilityHelper,
		private address: AddressHelper
    ) {
        this.getCompanies();
    }
	
	ngOnInit(): void {
		if (!this.utility.chkPagePermission('Banking'))
		{
			this.showPage = false;
		}
    }
	
	getCompanies() {
        this.companyService.getCompany().subscribe(res => {
            if (res.code == '1') {
                this.companyList = res.results;
				this.getCountries();
            }
        })
    }
	
	getCountries() {
        this.address.getCountry('all').then(country => {
                this.countryList = country
        });
    }
	
	selectCountry(val: any) {
        if (val.value == '') {
            this.toastr.info('Please select country');
            this.stateList.length = 0;
        } else {
            this.address.getState(val.value).then(response => {
                // @ts-ignore
                this.stateList = response.states
            })
        }
    }
	
	selectState(val: any) {
        if (val.value == '') {
            this.toastr.info('Please select state/province');
        } else {
			// @ts-ignore
            this.address.getCity(val.value, this.addBankForm.value.country).then(response => {
                this.cityList = response
            })
        }
    }
	
	get f() {
		return this.addBankForm.controls;
    }
	
	saveBank(){
		console.log("start");
		this.formSubmitted = true;
		if (this.addBankForm.invalid) {
			this.toastr.error("Fill the missing fields.");
            return;
        }
		console.log("end");
		this.formSubmitted = false;
		/*------------------------------------------------------------*/
		
		var cri = {
			"bankName": this.addBankForm.value.bankName,
			"accountNumber": this.addBankForm.value.accountNumber,
			"routingNumber": this.addBankForm.value.routingNumber,
			"companyId": this.addBankForm.value.companyId,
			"bankAddress": this.addBankForm.value.bankAddress,
			"country": this.addBankForm.value.country,
			"province": this.addBankForm.value.province,
			"city": this.addBankForm.value.city,
			"postalCode": this.addBankForm.value.postalCode,
			"openingBalance": this.addBankForm.value.openingBalance
		}
		
		console.log(cri);
		
		this.companyService.addBank(cri).subscribe(res => {
            if (res.code == '1') {
                this.toastr.success("Bank Added Successfully..");
				this.addBankForm.reset();
				this.storeList = [];
				this.cityList = [];
				this.stateList = [];				
            }
        })
	}
}
