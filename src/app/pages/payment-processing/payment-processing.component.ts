import {Component} from '@angular/core';

import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {MatTableDataSource} from "@angular/material/table";
import {
    BrowserDB,
    CompanyService,
    Constants,
    InvoiceManagementService,
    SharedService,
    UtilityHelper
} from "../../shared";
import * as moment from 'moment';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import CompareValidation from "../../shared/directive/greaterThan";

@Component({
    selector: 'app-payment',
    templateUrl: './payment-processing.component.html',
    styleUrls: ['./payment-processing.component.scss']
})
export class PaymentComponent {
    constructor(
        private companyService: CompanyService,
        private invoiceService: InvoiceManagementService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private utility: UtilityHelper,
        private _snap: ActivatedRoute
    ) {
        this.getVendor();
        //this.getInvoice();
    }
	
	showPage:boolean = true;
    // @ts-ignore
    public paymentForm: FormGroup;
    vendorList: any;
    paymentMethodList = [{name: 'Online', id: 1}, {name: 'Cash', id: 2}, {name: "Account Pay", id: 3}];
    submitted: boolean = false;
    invoiceList: any;
    invoiceNumber: any;
    apInvoiceId: any;
    invoiceDate: string = ''
    invoiceDateSubmit : string =''
    amountPaid:string=''
    pendingAmount:string=''
    amount:string=''
    invoiceAmount:string=''
    invoiceId:string=''
    myFiles: [] = [];


    getVendor() {
        this.companyService.getVendor()
            .subscribe(res => {
                if (res.code == "1") {
                    this.vendorList = res.results;
                }
            })
    }
    setPaymentDetails(){
        this._snap.params.subscribe(idx=> {
            if(idx['id']!=='init')
            {
                this.invoiceService.getInvoiceById(idx['id']).subscribe(res=>{
                    if(res.code === '1')
                    {
                        this.invoiceList = [res.results]
                         // @ts-ignore
                        this.setInvoiceDate({value:idx.id})
                    }
                })
            }
        })
    }

    convertDate(date:string){

        const dateArray = date.split(",");
        this.invoiceDateSubmit=  dateArray[0]+"-"+dateArray[1]+"-"+dateArray[2]
    }

    submitPayment() {
        this.submitted = true;
        console.log("<<<<<", this.paymentForm.controls)
        if (this.paymentForm.invalid) return;
        const newObj = {
            ...this.paymentForm.getRawValue(),
            "invoiceDate": new Date(this.invoiceDateSubmit).toISOString().replace('Z', '').replace('.000',''),
            "invoiceNumber" : this.invoiceNumber,
            // @ts-ignore
            "clearanceDate": new Date(this.paymentForm.controls.clearanceDate.value).toISOString().replace('Z','').replace('.000','')
        }

        delete newObj.uploadDoc;
        this.invoiceService.paymentProcessing(newObj)
            .subscribe(res => {
                if (res.code == "1") {
                    this.uploadInvoice(res.results);
                }
            })
    }

    filterInvoicesByVendor(val:any) {
        console.log(val.value)
        this.invoiceService.filterInvoice({'vendor_id':val.value},null)
            .subscribe(res => {
                if (res.code == '1') {
                    this.invoiceList = res.results.filter((invoice: any) => invoice.paymentStatus !== 'COMPLETED');
                    console.log(this.invoiceList)
                }
            })
    }

    setInvoiceDate(val: any) {
        if (val.value == 'init') {
            return
        }
        console.log(this.invoiceList)
      // @ts-ignore
      
        const invoiceDetails  = this.invoiceList.find(item => item.apInvoiceId == val.value );
        // console.log('.....', invoiceDetails)

        this.invoiceDate = invoiceDetails.invoiceDateString;
        this.invoiceNumber = invoiceDetails.invoiceNumber;

        this.convertDate(invoiceDetails.invoiceDate.join(','))

        const paidAmount = (invoiceDetails.amountPaid== undefined ? 0: invoiceDetails.amountPaid)
        const pendingAmount =  Number((invoiceDetails.totalAmount) - paidAmount).toFixed(2)
        this.paymentForm.controls['invoiceDate'].setValue(
            moment(new Date(this.invoiceDate).toISOString()).format('DD/MM/YYYY')
        );

        this.paymentForm.controls['vendorId'].setValue(invoiceDetails.vendorId);
        this.paymentForm.controls['apInvoiceId'].setValue(invoiceDetails.apInvoiceId);
        this.paymentForm.controls['paymentMode'].setValue(invoiceDetails.paymentMethod);
        this.paymentForm.controls['invoiceAmount'].setValue(invoiceDetails.totalAmount);
        this.paymentForm.controls['amountPaid'].setValue(invoiceDetails.amountPaid== undefined ? 0: invoiceDetails.amountPaid);
        this.paymentForm.controls['approvalInfo'].setValue(invoiceDetails.approvalInfo);
        this.paymentForm.controls['pendingAmount'].setValue(pendingAmount);
        this.paymentForm.controls['invoiceNumber'].setValue(invoiceDetails.apInvoiceId)
    }

    ngOnInit(): void {
		if (!this.utility.chkPagePermission('PaymentProcessing'))
		{
			this.showPage = false;
		}
		
        this.paymentForm = this.formBuilder.group(
            {
                vendorId: ['', [Validators.required]],
                paymentMode: ['', [Validators.required]],
                paymentStatus: ['NEW', [Validators.required]],
                clearanceDate: ['', [Validators.required]],
                chequeNumber: ['', [Validators.required]],
                invoiceNumber: ['', [Validators.required]],
                invoiceDate: ['', [Validators.required]],
                invoiceAmount: ['', [Validators.nullValidator]],
                amountPaid: ['', [Validators.nullValidator]],
                pendingAmount: ['', [Validators.nullValidator]],
                amount: ['', [Validators.required]],
                confirmation: ['', [Validators.required]],
                uploadDoc: ['', [Validators.required]],
                approvalInfo: ['', [Validators.required]],
                apInvoiceId: ['']
            },
            {validator: CompareValidation.match('pendingAmount', 'amount')}  // key is to validate on the form group
        );
        setTimeout(() => {
            this.setPaymentDetails();
        }, 1000)
    }
    get f(): { [key: string]: AbstractControl; } {
        return this.paymentForm.controls;
    }

    onSelectFile(event: any) {
        if (event.target.files && event.target.files[0]) {
            this.utility.fileSize(event.target, '16 MB');
                let filesAmount = event.target.files.length;
                for (let i = 0; i < filesAmount; i++) {
                    // @ts-ignore
                    this.myFiles.push(event.target.files[i]);
            }
        }
    }
    uploadInvoice(idx?: string) {
        const formData = new FormData();
        for (let i = 0; i < this.myFiles.length; i++) {
            formData.append("documents", this.myFiles[i]);
        }
        this.companyService.vendorUpload(idx,formData ).subscribe(res => {
            if (res.code == 1) {
                this.toastr.success(res.message);
                this.paymentForm.reset()
                this.submitted = false;
            }
        })
    }
}