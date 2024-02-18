import {Component} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {Constants} from "../../shared";
import {CompanyService} from "../../shared";

@Component({
    selector: 'app-companyd',
    templateUrl: './company-detail.component.html',
    styleUrls: ['./company-detail.component.scss']
})
export class CompanydComponent {
    constructor(
        private router: Router,
        private constants: Constants,
        private service: CompanyService,
        private _snap: ActivatedRoute
    ) {

    }

    companyID: string = '';
    name = '';
    companyType = '';
    gst = '';
    memo = '';
    city = '';
    country = '';
    address = '';
    contactName = ''
    contactNumber = ''
    emailId = ''
    accountingNumber = ''
    routingNumber = ''
    storeName = ''
    province = ''
    storeList: any;


    ngOnInit(): void {
        this._snap.params.subscribe(params => {
            // @ts-ignore
            this.companyID = params.id
            this.service.getCompanyDetails(this.companyID).subscribe(res => {
                if (res.code == '1') {
                    const val = res.results;
                    this.getStore(val.companyId);
                    this.name = val.name;
                    this.companyType = val.companyType;
                    this.gst = val.gst;
                    this.memo = val.memo;
                    this.province = val.address.province
                    this.city = val.address.city;
                    this.country = val.address.country;
                    this.address = val.address.address1;
                    this.contactName = val.contactInfo.contactName
                    this.contactNumber = val.contactInfo.contactNumber
                    this.emailId = val.contactInfo.emailId
                    this.accountingNumber = val.bankAccount.accountingNumber
                    this.routingNumber = val.bankAccount.routingNumber
                    this.storeName = val.storeName
                }
            })
        })
    }

    editCompany(): void {
        this.router.navigate(['company/edit', this.companyID])

    }

    getStore(id: any) {
        this.service.getStore(id).subscribe(res=> {
            if (res.code == '1') {
                this.storeList = res.results;
            }
        })
    }


    goBack(){
        this.router.navigate(['company'])
    }
}
