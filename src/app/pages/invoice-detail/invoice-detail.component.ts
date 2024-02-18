import {Component} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from "@angular/router";
import {Constants, InvoiceManagementService, blobFileDownload} from "../../shared";
import {BrowserDB} from "../../shared";
import {CompanyService} from "../../shared";
import {Observable} from "rxjs";
import {HttpEventType} from "@angular/common/http";

@Component({
    selector: 'app-invoiced',
    templateUrl: './invoice-detail.component.html',
    styleUrls: ['./invoice-detail.component.scss']
})

export class InvoicedComponent {
    itemList: any;
    constructor(
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        private router: Router,
        private constants: Constants,
        private browser: BrowserDB,
        private service: CompanyService,
        private route: ActivatedRoute,
        private invoiceService: InvoiceManagementService,
    ) {
        // this.getVendorDetails()
        this.getItems()
    }

    public percentDone: number = 0;
    public progressBar: boolean = false
    submitted = false;
    companyList: any;
    invoiceNumber: any = '';
    invoiceDate: any = '';
    dueDate: any = '';
    companyName: any = '';
    vendorName: any = '';
    store: any = '';
    amount: any = '';
    GSTPrice: any = '';
    additionalCharges: any = '';
    paymentTerm: any = '';
    totalAmount: any = '';
    paymentMethod: any = '';
    goodsDescription: any = '';
    editId : string | null = '';
    uploadInvoiceId: any = ''
    docs: any = ''
    additionalGst:any=''
    invoiceDtl: any;

    // @ts-ignore
    download$: Observable<Download>


    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.editId = params.get('id');
            this.service.getInvoiceDetails(this.editId).subscribe(res => {
                if (res.code == '1') {
                    const val = res.results;
                    console.log('.......', val)
                    this.uploadInvoiceId = val.apInvoiceId;
                    this.invoiceNumber = val.invoiceNumber;
                    this.invoiceDate = val.invoiceDateString;
                    this.dueDate = val.dueDateString;
                    this.companyName = val.companyName;
                    this.vendorName = val.vendorName
                    this.store = val.storeName;
                    this.amount = val.amount
                    this.GSTPrice = val.gstAmount
                    this.additionalGst = val.additionalGst
                    this.additionalCharges = val.addlAmount
                    this.paymentTerm = val.paymentTerm
                    this.totalAmount = val.totalAmount
                    this.paymentMethod = val.paymentMethod
                    this.goodsDescription = val.goodsDesc;
                    this.docs = val.apInvoiceDocumentModelList
                    this.invoiceDtl =  val.invoiceDtl;
                }
            })
        });
    }


    onSubmit(): void {
        this.submitted = true;
    }

    getCompanies() {
        this.service.getCompany().subscribe(res => {
            if (res) {
                this.companyList = res.results;
                console.log('Res', res)
            }
        })
    }

    getDownload(id?: string, name?: string) {
        this.invoiceService.docDownload(id, this.progressBar)
            .subscribe(res=> {
                console.log('.......', res)
                blobFileDownload(res, name)
            })
    }
    getItems () {
		this.service.getCategory("14537667-f4e0-46b9-9dd4-71fc7fbf12d2").subscribe(res=> {
			if (res) {
				this.itemList =  res.results.itemModelList;
			}
		})
	}
    getItemName(itemId: number): string {
        //@ts-ignore
        const item = this.itemList.find(item => item.itemId === itemId);
        return item ? item.name : '';
      }

    editInvoice(){
      return   this.router.navigate(['invoice/edit', this.editId])
    }

    goBack(){
        this.router.navigate(['invoice-listing'])
    }
}