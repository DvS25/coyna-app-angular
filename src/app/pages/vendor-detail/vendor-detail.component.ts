import {Component} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from "@angular/router";
import {blobFileDownload, Constants, InvoiceManagementService} from "../../shared";
import {BrowserDB} from "../../shared";
import {CompanyService} from "../../shared";

@Component({
    selector: 'app-vendord',
    templateUrl: './vendor-detail.component.html',
    styleUrls: ['./vendor-detail.component.scss']
})
export class VendordComponent {
    constructor(
        private notification: ToastrService,
        private router: Router,
        private _snap: ActivatedRoute,
        private constants: Constants,
        private service: CompanyService,
        private invoiceService : InvoiceManagementService
    ) {
        this.getVendorDetails();
    }

    vendorId: string = ''
    companyName: any = '';
    vendorName: any = '';
    storeName: any = ''
    street: any = ''
    country: any = ''
    city: any = ''
    postalCode: any = ''
    companyDocs:any={};

    payment: any;
    contactInfo: any;
    bankAccount: any;
    vendorInfo: any;

    document: any;

    ngOnInit(): void {
    }

    getVendorDetails() {
        this._snap.params.subscribe(params => {
            // @ts-ignore
            this.vendorId = params.id
            // @ts-ignore
            this.service.getVendorDetails(params.id).subscribe(res => {
                console.log(">>>>>>??????", res)
                const val = res.results;
                this.vendorInfo = val;
                this.payment = val.payment;
                this.bankAccount = val.bankAccount;
                this.contactInfo  = val.contactInfo;
                this.document = val.document;
            })
        })
    }

    editVendorDetails() {
        this.router.navigate(['vendor/edit/', this.vendorId])
    }

    getDownload(id?: string, name?: string) {
        console.log('.....', id)
        this.invoiceService.docDownload(id)
            .subscribe(res=> {
                console.log('.......', res)
                blobFileDownload(res, name)
            })
    }
    goBack(){
        this.router.navigate(['vendor-listing'])
    }

    protected readonly ActivatedRoute = ActivatedRoute;
}