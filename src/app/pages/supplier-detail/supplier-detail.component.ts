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
import alasql from 'alasql';

@Component({
    selector: 'app-invoiced',
    templateUrl: './supplier-detail.component.html',
    styleUrls: ['./supplier-detail.component.scss']
})

export class SupplierComponent {
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
        private companyService: CompanyService,
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
    gstAmount: any = '';
    //additionalCharges: any = '';
    //paymentTerm: any = '';
    totalAmount: any = '';
    //paymentMethod: any = '';
    //goodsDescription: any = '';
    editId : string | null = '';
    //uploadInvoiceId: any = ''
    docs: any = ''
    addlAmount:any=''
    invoiceDtl: any;
    alldata: any = [];
	data: any = [];
	pdata: any = [];
    limit: number = 10;
    year: string | null = '';

    // @ts-ignore
    download$: Observable<Download>


    ngOnInit(): void {
        this.route.paramMap.subscribe(param => {
            this.pdata = param.get('result');
            
        });
        
      /*  var params = '';
		var values = '';
        
			params = params + ",year";
			values = values + ","+"2023";
		
        this.route.paramMap.subscribe(param => {
            this.editId = param.get('id');
            this.year = param.get('values');
            this.companyService.fetchReport('supplierst-report',params,values).subscribe(res => {
                if (res.code == "1") {
                    this.alldata = res.results;
                    this.data = res.results;
                    var res = alasql('SELECT documentId,documentName,invoiceNumber,invoiceDate,amount,gstAmount,addlAmount,totalAmount FROM ? order by serialNumber LIMIT '+this.limit+' OFFSET 0',[this.alldata]);
                    this.pdata = res;
                    for(var i in this.pdata){
                        if(this.pdata[i].documentId == this.editId){
                            this.invoiceNumber = this.pdata[i].invoiceNumber;
                            this.invoiceDate = this.pdata[i].invoiceDate;
                            this.gstAmount = this.pdata[i].gstAmount;
                            this.addlAmount = this.pdata[i].addlAmount;
                            this.amount = this.pdata[i].amount;
                            this.totalAmount = this.pdata[i].totalAmount;
                        
                        }
                        
                    }
                }
            })
        });*/
   

       /* this.route.paramMap.subscribe(params => {
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
        });*/
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
		this.service.getCategory("7339e27d-79fe-4e9e-a9aa-590c532497f0").subscribe(res=> {
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
        this.router.navigate(['supplier-statement'])
    }
}