import { Component } from '@angular/core';
import {
    AbstractControl, FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { Constants, CompanyService, UtilityHelper } from "../../shared";
import { BrowserDB } from "../../shared";
import { AddressHelper } from "../../shared";
import { MatCheckboxChange } from '@angular/material/checkbox';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';

@Component({
    selector: 'app-acompany',
    templateUrl: './add-company.component.html',
    styleUrls: ['./add-company.component.scss']
})
export class CompanyComponent {
    constructor(
        private service: CompanyService,
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        private router: Router,
        private constants: Constants,
        private browser: BrowserDB,
        private address: AddressHelper,
        private utility: UtilityHelper
    ) {

    }

    showPage: boolean = true;
    // @ts-ignore
    companyForm: FormGroup;
    submitted = false;
    countryList: any;
    stateList: any;
    cityList: any;
    singleCountry: string = '';
    isCompany: boolean = false;
    PastFinanceList: any = [];
    CoynaList: any = [];
    TaxStructureList: any = [];
    DestinationList: any = [];
    IndustryList: any = [];
    CurrencyList: any = [];
    CompanyData: any = {};
    CoynaIds: any = [];
    DupCoynaIds: any = [];
    isLinear = false;

    ngOnInit(): void {
        this.GetPastFinanceList();
        this.GetTaxStructureList();
        this.GetDestination();
        this.GetIndustry();
        this.GetCoynaList();
        this.GetCurrency();
        this.GetCountry();
        // if (!this.utility.chkPagePermission('CompanyManagement')) {
        //     this.showPage = false;
        // }
        // this.address.getCountry('all')
        //     .then(country => {
        //         this.countryList = country
        //     });
        this.companyForm = this.formBuilder.group(
            {
                pastFinanceId: ['', [Validators.required]],
                businessName: ['', [Validators.required]],
                dateOfIncorporation: ['', [Validators.required]],
                taxStructureId: ['', [Validators.required]],
                industryTypeId: ['', [Validators.nullValidator]],
                designationId: ['', [Validators.nullValidator]],
                numberOfEmployees: ['', [Validators.nullValidator]],
                address: ['', [Validators.required]],
                currencyId: ['', [Validators.required]],
                useCoynaIds: ['', [Validators.required]],
                country: ['', [Validators.required]],
                state: ['', [Validators.required]],
                city: ['', [Validators.required]],
                zipcode: ['', [Validators.required]]
            },
        );
    }


    get f(): { [key: string]: AbstractControl; } {
        return this.companyForm.controls;
    }


    removeStoreName(index: any) {
        (this.companyForm.get('addStoreName') as FormArray).removeAt(index);
    }

    getStoreFormControls(): any {
        return (<FormArray>this.companyForm.get('addStoreName')).controls
    }


    checkCompany(target?: any) {
        if (target.value.length > 2) {
            this.service.isCompany(target.value).subscribe(res => {
                if (res.results) {
                    this.isCompany = false
                }
                if (!res.results) {
                    this.companyForm.controls['name'].setErrors({ isAlready: true })
                    this.isCompany = true
                }
            })
        } else {
            this.isCompany = false
        }
    }
    goBack() {
        this.router.navigate(['company'])
    }

    GetCoynaList() {
        this.service.getCoyna().subscribe(res => {
            console.log(res);
            if (res.code == "1") {
                this.CoynaList = res.results;
            }
        })
    }


    GetPastFinanceList() {
        this.service.getPastFinance().subscribe(res => {
            console.log(res);
            if (res.code == "1") {
                this.PastFinanceList = res.results;
            }
        })
    }

    GetTaxStructureList() {
        this.service.getTaxStructure().subscribe(res => {
            console.log(res);
            if (res.code == "1") {
                this.TaxStructureList = res.results;
            }
        })
    }

    GetDestination() {
        this.service.getDestination().subscribe(res => {
            console.log(res);
            if (res.code == "1") {
                this.DestinationList = res.results;
            }
        })
    }

    GetIndustry() {
        this.service.getIndustry().subscribe(res => {
            console.log(res);
            if (res.code == "1") {
                this.IndustryList = res.results;
            }
        })
    }

    GetCurrency() {
        this.service.getCurrency().subscribe(res => {
            console.log(res);
            if (res.code == "1") {
                this.CurrencyList = res.results;
            }
        })
    }


    GetCountry() {
        this.service.getV1Country().subscribe(res => {
            console.log(res);
            if (res.code == "1") {
                this.countryList = res.results;
            }
        })
    }

    CountryOnChange(value: string) {
        this.service.getV1State(value).subscribe(res => {
            console.log(res);
            if (res.code == "1") {
                this.stateList = res.results;
            }
        })
    }

    StateOnChange(value: string) {
        this.service.getV1City(value).subscribe(res => {
            console.log(res);
            if (res.code == "1") {
                this.cityList = res.results;
            }
        })
    }




    SaveCompany(stepper: MatStepper) {
        this.submitted = true;
        if (this.companyForm.invalid) {
            return;
        }
        stepper.next();
    }

    SetupCompany() {
        const obj = {
            "pastFinanceId": this.companyForm.value.pastFinanceId,
            "businessName": this.companyForm.value.businessName,
            "dateOfIncorporation": this.companyForm.value.dateOfIncorporation,
            "taxStructureId": this.companyForm.value.taxStructureId,
            "industryTypeId": this.companyForm.value.industryTypeId,
            "designationId": this.companyForm.value.designationId,
            "numberOfEmployees": this.companyForm.value.numberOfEmployees,
            "address": this.companyForm.value.address,
            "city": this.companyForm.value.city,
            "state": this.companyForm.value.state,
            "zipCode": this.companyForm.value.zipcode,
            "country": this.companyForm.value.country,
            "currencyId": this.companyForm.value.currencyId,
            "useCoynaIds": this.CoynaIds
        };
        this.service.companyRegister(obj).subscribe(
            res => {
                if (res.code == "1") {
                    this.notification.success(res.message);
                    this.router.navigate(['/companysetupinfo']);
                }
            }, error => {
            })
    }

    Skipnow(stepper: MatStepper) {
        stepper.next();
    }

    onChange(selectedOption: MatCheckboxChange) {
        let ids = selectedOption.source.value;
        this.DupCoynaIds.push(ids);
        if (selectedOption.checked) {
            this.CoynaIds = this.DupCoynaIds;
        } else {
            const i = this.DupCoynaIds.findIndex((o: { value: string; }) => o.value === selectedOption.source.value);
            this.DupCoynaIds.pop(i);
            this.CoynaIds = this.DupCoynaIds;
        }
    }
}
