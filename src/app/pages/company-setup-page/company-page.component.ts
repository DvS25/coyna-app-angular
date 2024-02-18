import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { BrowserDB, CompanyService, Constants } from 'src/app/shared';
import { AdminComponent } from 'src/app/layouts/admin/admin.component';


@Component({
    selector: 'app-company-page',
    templateUrl: './company-page.component.html',
    styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent {
    FiscalYearList: any = [];
    AccountingMethodList: any = [];
    TaxStructureList: any = [];
    CurrencyList: any = [];
    DateFormatList: any = [];
    NumberFormatList: any = [];
    PaymentTermsList: any = [];
    // @ts-ignore
    companySetupForm: FormGroup;
    isChecked: any;
    FiscalYear: any;
    submitted = false;
    CompanyData: any = {};
    constructor(
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        private router: Router,
        private CompanyService: CompanyService,
        private browser: BrowserDB,
        private AdminComponent: AdminComponent,
        public constant: Constants
    ) {
    }



    ngOnInit(): void {
        this.AdminComponent.SetTitle('Company Setup');

        // this.browser.setLocalStorage('PT', "Company Setup");
        this.GetFiscalYearList();
        this.GetAccountingMethodList();
        this.GetTaxStructureList();
        this.GetCurrency();
        this.GetDateFormatList();
        this.GetNumberFormatList();
        this.GetPaymentTermsList();
        this.GetCompanyData();

        this.companySetupForm = this.formBuilder.group(
            {
                fiscalYear: ['', [Validators.required]],
                accountingMethod: ['', [Validators.required]],
                taxStructureId: ['', [Validators.required]],
                currencyId: ['', [Validators.required]],
                dateOfIncorporation: ['', [Validators.required]],
                dateFormat: ['', [Validators.required]],
                numberFormat: ['', [Validators.required]],
                billPaymentTerms: ['', [Validators.nullValidator]],
                invoicePaymentTerms: ['', [Validators.nullValidator]],
                enableCOA: ['', [Validators.required]],
                enableDepartment: ['', [Validators.required]],
                companyType: ['', [Validators.required]],
            },
        );
    }

    get f(): { [key: string]: AbstractControl; } {
        return this.companySetupForm.controls;
    }

    GetFiscalYearList() {
        this.FiscalYearList.push({ name: 'January' });
        this.FiscalYearList.push({ name: 'February' });
        this.FiscalYearList.push({ name: 'March' });
        this.FiscalYearList.push({ name: 'April' });
        this.FiscalYearList.push({ name: 'May' });
        this.FiscalYearList.push({ name: 'June' });
        this.FiscalYearList.push({ name: 'July' });
        this.FiscalYearList.push({ name: 'August' });
        this.FiscalYearList.push({ name: 'September' });
        this.FiscalYearList.push({ name: 'October' });
        this.FiscalYearList.push({ name: 'November' });
        this.FiscalYearList.push({ name: 'December' });
    }

    GetAccountingMethodList() {
        this.CompanyService.getAccountingMethodList().subscribe(res => {
            console.log(res);
            if (res.code == "1") {
                // this.AccountingMethodList = res.results;
                this.AccountingMethodList = [];
                for (let obj of res.results) {
                    this.AccountingMethodList.push({ metadataId: obj });
                }
            }
        })
    }

    GetTaxStructureList() {
        this.CompanyService.getTaxStructure().subscribe(res => {
            console.log(res);
            if (res.code == "1") {
                this.TaxStructureList = res.results;
            }
        })
    }

    GetCurrency() {
        this.CompanyService.getCurrency().subscribe(res => {
            console.log(res);
            if (res.code == "1") {
                this.CurrencyList = res.results;
            }
        })
    }

    GetDateFormatList() {
        this.DateFormatList.push({ name: 'MM/DD/YYYY' });
        this.DateFormatList.push({ name: 'DD/MM/YYYY' });
        this.DateFormatList.push({ name: 'YYYY/MM/DD' });
        this.DateFormatList.push({ name: 'MM-DD-YYYY' });
        this.DateFormatList.push({ name: 'DD-MM-YYYY' });
        this.DateFormatList.push({ name: 'YYYY-MM-DD' });
    }

    GetNumberFormatList() {
        this.NumberFormatList.push({ name: 'Decimal value with Options' });
    }

    GetPaymentTermsList() {
        this.CompanyService.getPaymentTermList().subscribe(res => {
            if (res.code == "1") {
                // this.PaymentTermsList = res.results;
                this.PaymentTermsList = [];
                for (let obj of res.results) {
                    this.PaymentTermsList.push({ metadataId: obj });
                }
            }
        })
    }



    SaveCompanySetup() {
        this.submitted = true;
        if (this.companySetupForm.invalid) {
            return;
        }
        const obj = {
            "fiscalYear": this.companySetupForm.value.fiscalYear,
            "accountingMethod": this.companySetupForm.value.accountingMethod,
            "taxStructureId": this.companySetupForm.value.taxStructureId,
            "dateOfIncorporation": new Date(this.companySetupForm.value.dateOfIncorporation),
            "currencyId": this.companySetupForm.value.currencyId,
            "dateFormat": this.companySetupForm.value.dateFormat,
            "numberFormat": this.companySetupForm.value.numberFormat,
            "billPaymentTerms": this.companySetupForm.value.billPaymentTerms,
            "invoicePaymentTerms": this.companySetupForm.value.invoicePaymentTerms,
            "enableCOA": this.companySetupForm.value.enableCOA,
            "enableDepartment": this.companySetupForm.value.enableDepartment,
            "companyType": this.companySetupForm.value.companyType == true ? 'product' : 'service',
            "businessName": this.CompanyData.businessName ?? "",
            "taxIdType": this.CompanyData.taxIdType ?? "",
            "taxIdNumber": this.CompanyData.taxIdType ?? "",
            "address": this.CompanyData.address ?? "",
            "city": this.CompanyData.city ?? "",
            "state": this.CompanyData.state ?? "",
            "zipCode": this.CompanyData.zipCode ?? "",
            "emailId": this.CompanyData.legalEmailId ?? "",
            "contactNumber": this.CompanyData.contactNumber ?? "",
            "website": this.CompanyData.legalWebsite ?? "",
            "legalAddress": this.CompanyData.legalAddress ?? "",
            "legalCity": this.CompanyData.legalCity ?? "",
            "legalState": this.CompanyData.legalState ?? "",
            "legalZipCode": this.CompanyData.legalZipCode ?? "",
            "legalEmailId": this.CompanyData.legalEmailId ?? "",
            "legalContactNumber": this.CompanyData.legalContactNumber ?? "",
            "legalWebsite": this.CompanyData.legalWebsite ?? ""
        };
        this.CompanyService.updateCompanyDetailsWithoutId(obj).subscribe(
            res => {
                if (res.code == "1") {
                    let userData = this.browser.getLocalStorage(this.constant.SET_USER_RESPONSE);
                    userData.companySettings.deptEnabled = this.companySetupForm.value.enableDepartment;
                    this.browser.setLocalStorage(this.constant.SET_USER_RESPONSE, userData);
                    this.notification.success(res.message);
                    this.router.navigate(['/customerinfo']);
                }
            }, error => {
            })
    }

    GetCompanyData() {
        this.CompanyService.getCompany().subscribe(
            res => {
                if (res.code == "1") {
                    this.CompanyData = res.results;
                }
                this.CompanyData.currencyId = this.CompanyData.metadata.currencyId;
                this.CompanyData.taxStructureId = this.CompanyData.metadata.taxStructureId;
                if (this.CompanyData.companyType == 'product') {
                    this.CompanyData.companyType = true;
                }
                else {
                    this.CompanyData.companyType = false;
                }
            }, error => {
            })
    }







}
