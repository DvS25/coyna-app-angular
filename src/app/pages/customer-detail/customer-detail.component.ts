import { Component } from '@angular/core';
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
import { CustomerService } from 'src/app/shared/service/apis/customer.service';
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent {
  customerInfo: any;
  address: any;
  customerId: any;
  shippingAddress: any;
  billingAddress: any;
  constructor(
    private notification: ToastrService,
    private router: Router,
    private _snap: ActivatedRoute,
    private constants: Constants,
    private service: CompanyService,
    private customerService: CustomerService,
    private invoiceService : InvoiceManagementService
) {
    this.getCustomerDetails();
}

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

getCustomerDetails() {
    this._snap.params.subscribe(params => {
      //@ts-ignore
        this.customerId = params.id
        // @ts-ignore
        this.customerService.getCustomerById(params.id).subscribe(res => {
            console.log(">>>>>>??????", res)
            const val = res.results;
            this.customerInfo = val;
            this.payment = val.payment;
            this.bankAccount = val.bankAccount;
            this.contactInfo  = val.contactInfo;
            if(val.address[0].addressType==="SHIPPING")
            { 
              this.shippingAddress = val.address[0]
              this.billingAddress = val.address[1]
            }
            else
            { 
              this.shippingAddress = val.address[1]
              this.billingAddress = val.address[0]
            }
        })
    })
}

editCustomer() {
    this.router.navigate(['customer/edit/', this.customerId])
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
    this.router.navigate(['customer-listing'])
}

protected readonly ActivatedRoute = ActivatedRoute;

}
