import {Component, Inject} from '@angular/core';

import {
    AbstractControl, FormArray,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';

import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from "@angular/router";
import {Constants, InvoiceManagementService, UtilityHelper} from "../../../shared";
import {BrowserDB} from "../../../shared";
import {CompanyService} from "../../../shared";
import * as moment from "moment";
import { DOCUMENT } from "@angular/common";

@Component({
    selector: 'app-edit-invoice',
    templateUrl: './edit-invoice.component.html',
    styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent {
	showPage:boolean = true;
    // @ts-ignore
    public invoiceForm: FormGroup;
    public companyList: any;
    public vendorList: any;
    public invoiceDoc: any;
    public storeList: any;
    dateFormat = 'MM/dd/YYYY';
    gstAmount_1: number = 0;
    addlAmount_1: number = 0;
    amount_1: number = 0;
    //appInvoiceID='';
    quantity: number = 0;
    unitPrice: number = 0;
    totalTaxPrice: number = 0;
    uom = ["Kilogram","Gram","Pound","Litre","Gallon"]
    taxArray: any[] = []
    totalArray: any[] = []
    isInvoice: boolean = false;
    documents: any = [];
    invoiceId: any;
    itemList: any;

    constructor(
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        private router: Router,
        private constants: Constants,
        private browser: BrowserDB,
        private invoiceService: InvoiceManagementService,
        private companyService: CompanyService,
        private utility: UtilityHelper,
        private _route: ActivatedRoute,
        @Inject(DOCUMENT) document: Document

    ) {
        this.getCompanies();
        this.getVendor();
        this.getInvoiceDetails();
        this.getItems();
    }

    submitted = false;
    paymentMethodList = [{name: 'Online', id: 1}, {name: 'Cash', id: 2}, {name: "Account Pay", id: 3}];

    ngOnInit(): void {
		if (!this.utility.chkPagePermission('InvoiceListing'))
		{
			this.showPage = false;
		}
		
        this.invoiceForm = this.formBuilder.group(
            {
                invoiceNumber: ['', [Validators.required]],
                companyId: ['', [Validators.required]],
                vendorId: ['', [Validators.required]],
                invoiceDate: ['', [Validators.required]],
                dueDate: ['', [Validators.required]],
                //invoiceType: ['', []],
                totalAmount: ['',],
                amount: ['', [Validators.required]],
                addlAmount: ['', []],
                additionalGst:['',[]],
                gstAmount: ['', []],
                paymentTerm: ['', [Validators.required]],
                paymentMethod: ['', [Validators.required]],
                uploadInvoice: ['', [Validators.nullValidator]],
                storeId: ['', [Validators.required]],
                invoiceDtl: this.formBuilder.array([])
            },
        );
    }

    get f(): { [key: string]: AbstractControl; } {
        return this.invoiceForm.controls;
    }

    getItems () {
		this.companyService.getCategory("14537667-f4e0-46b9-9dd4-71fc7fbf12d2").subscribe(res=> {
			if (res) {
				this.itemList =  res.results.itemModelList;
			}
		})
	}

    get itemFormArray() {
        // @ts-ignore
        return this.f.invoiceDtl as FormArray
    }

    addItem(row?: object) {
        this.itemFormArray.push(
            this.formBuilder.group({
                // @ts-ignore
                apInvoiceDtlId: [row.apInvoiceDtlId],
                // @ts-ignore
                itemId: [row.itemId, [Validators.required]],
                // @ts-ignore
                quantity: [row.quantity,[Validators.required]],
                // @ts-ignore
                uom: [row.uom, [Validators.required]],
                // @ts-ignore
                unitPrice: [row.unitPrice, [Validators.required]],
                // @ts-ignore
                amount: [row.amount],
                // @ts-ignore
                taxName: [row.taxName],
                // @ts-ignore
                taxValue: [row.taxValue],
                // @ts-ignore
                totalAmount: [row.totalAmount],
            })
        )
    }
    addNewItem() {
       const obj = {
            //apInvoiceDtlId:this.appInvoiceID,
           itemId: '',    
           quantity: '',
           uom: '',
           unitPrice: '',
           amount: '',
           taxName:'',
           taxValue:'',
           totalAmount:''
       };
      this.addItem(obj)
    }
    removeItem(index?: any) {
        const arInvoiceDtlId = this.itemFormArray.value[index].apInvoiceDtlId;
        if(arInvoiceDtlId!=null)
        {
            this.invoiceService.deleteItem(arInvoiceDtlId).subscribe(res=>{
                if(res.code==='1')
                {
                    this.notification.success("Invoice item deleted successfully")
                }
            })
        }
        this.itemFormArray.removeAt(index);
        this.taxArray.splice(index, 1);
        this.totalArray.splice(index, 1);
        this.invoiceForm.controls['gstAmount'].setValue(Number(this.taxArray.reduce((partialSum, a) => partialSum + a, 0)).toFixed(2))
        this.invoiceForm.controls['amount'].setValue(Number(this.totalArray.reduce((partialSum, a) => partialSum + a, 0)).toFixed(2))
        this.invoiceForm.controls['totalAmount'].setValue(Number(Number(this.invoiceForm.value.amount) + Number(this.invoiceForm.value.gstAmount) + Number(this.invoiceForm.value.addlAmount)+Number(this.invoiceForm.value.additionalGst)).toFixed(2))
        this.updateInvoice()
        
    }


    getCompanies() {
        this.companyService.getCompany().subscribe(res => {
            if (res.code == "1") {
                this.companyList = res.results;
            }
        })
    }

    getVendor() {
        this.companyService.getVendor()
            .subscribe(res => {
                if (res.code == "1") {
                    this.vendorList = res.results;
                }
            })
    }

    getStore(val: any) {
        const id = val.value;
        this.companyService.getStore(id)
            .subscribe(res => {
                if (res.code == "1") {
                    this.storeList = res.results;
                }
            })
    }

    onFileSelected(event: any) {
        if (event.target.files[0] !== undefined) {
            if (this.utility.fileSize(event.target, '16 MB'))
                this.invoiceDoc = event.target.files[0]
        }
    }


    updateInvoice() {
        this.submitted = true;
        if (this.invoiceForm.invalid) return;
        if (this.invoiceForm.value.amount == 0 || this.invoiceForm.value.amount == "0" || !this.invoiceForm.value.amount) {
            console.log('error in amount')
        }

        if (this.invoiceForm.value.invoiceDtl.length > 0) {
            const taxValueArray = [] ;
            const amountArray = [] ;
            for (let val of this.invoiceForm.value.invoiceDtl) {
                taxValueArray.push(Number(val.taxValue));
                amountArray.push(Number(val.amount))
            }
            const sum = taxValueArray.reduce((partialSum, a) => partialSum + a, 0);
            const amountSum = amountArray.reduce((partialSum, a) => partialSum + a, 0);

            if (Number(amountSum).toFixed(2) > this.invoiceForm.value.amount || Number(amountSum).toFixed(2) < this.invoiceForm.value.amount ) {
                this.notification.error(`Your amount should be ${Number(amountSum).toFixed(2)}`)
                return;
            }
            if (Number(sum).toFixed(2) > this.invoiceForm.value.gstAmount ||  Number(sum).toFixed(2) < this.invoiceForm.value.gstAmount ) {
                this.notification.error(`Your GST price should be ${Number(sum).toFixed(2)}`)
                return;
            }
        }

        this._route.params.subscribe(params => {
            delete this.invoiceForm.value.uploadInvoice;

            const newObj = {
                ...this.invoiceForm.value,
                totalAmount: Number(this.invoiceForm.value.amount) + Number(this.invoiceForm.value.gstAmount) + Number(this.invoiceForm.value.addlAmount)+Number(this.invoiceForm.value.additionalGst),
                dueDate: new Date(this.invoiceForm.value.dueDate),
                invoiceDate: new Date(this.invoiceForm.value.invoiceDate),
            }
            if(newObj['addlAmount']===null) newObj['addlAmount']=0
            if(newObj['additionalGst']===null) newObj['additionalGst']=0
            console.log(newObj)
            // @ts-ignore
            this.invoiceService.updateInvoice(params.id, newObj)
                .subscribe(res => {
                    if (res.code == "1") {
                        if (this.invoiceDoc !== undefined) {
                            this.invoiceUpload(res.results);
                        }else {
                            this.notification.success('Invoice Updated successfully');

                        }
                    }
                })
        })

    }

    invoiceUpload(id: any) {
        const formData = new FormData();
        formData.append('documents', this.invoiceDoc);
        this.invoiceService.upload(id, formData)
            .subscribe(response => {
                if (response.code == '1') {
                    this.submitted = false;
                    this.notification.success('Invoice Updated successfully');
                    this.invoiceForm.reset();
                    // window.location.reload();
                }
            })
    }



    addQuantityAndPrice(type?: string, ix?: any) {
        // @ts-ignore
        const _quantity =  Number(document.getElementById(`quantity_${ix}`).value);
        // @ts-ignore
        const _unitPrice =  Number(document.getElementById(`unitPrice_${ix}`).value);

        const total = (_quantity) * (_unitPrice);
         // @ts-ignore
        const _taxPercent =  Number(document.getElementById(`taxName_${ix}`).value);
        
         // @ts-ignore
         const _taxValue =  (total* _taxPercent)/100;

        // @ts-ignore
        this.itemFormArray.controls[ix].controls.amount.setValue(Number(total).toFixed(2))
        // @ts-ignore
        this.itemFormArray.controls[ix].controls.taxValue.setValue(Number(_taxValue).toFixed(2));
        // @ts-ignore
        this.itemFormArray.controls[ix].controls.totalAmount.setValue(Number(total + _taxValue).toFixed(2));
        this.totalArray[ix] = Number(this.itemFormArray.controls[ix].getRawValue().amount);
        this.taxArray[ix] = this.itemFormArray.controls[ix].getRawValue().taxValue;

        this.invoiceForm.controls['amount'].setValue(Number(this.totalArray.reduce((partialSum, a) => Number(partialSum) + Number(a), 0)).toFixed(2));
        this.invoiceForm.controls['gstAmount'].setValue(Number(this.taxArray.reduce((partialSum, a) => Number(partialSum) + Number(a), 0)).toFixed(2));
        this.invoiceForm.controls['totalAmount'].setValue(Number(Number(this.invoiceForm.value.amount) + Number(this.invoiceForm.value.gstAmount) + Number(this.invoiceForm.value.addlAmount)+Number(this.invoiceForm.value.additionalGst)).toFixed(2))
        
    }

    getInvoiceDetails() {
        this._route.params.subscribe(param => {
            // @ts-ignore
            this.invoiceId = param?.id
            // @ts-ignore
            this.companyService.getInvoiceDetails(param?.id)
                .subscribe(res => {
                    if (res.code === '1') {
                        const val = res.results;
                        console.log(val)
                        this.documents = val.apInvoiceDocumentModelList;
                        //this.appInvoiceID = val.apInvoiceDtlId;
                        if(val.addlAmount == undefined)
                            val['addlAmount']=0
                        this.getStore({value: val.companyId})
                        // @ts-ignore
                        this.invoiceForm.setValue({
                            storeId: val.storeId,
                            invoiceNumber: val.invoiceNumber,
                            companyId: val.companyId,
                            vendorId: val.vendorId,
                            invoiceDate: this.formatDate(new Date(val.invoiceDate[0], val.invoiceDate[1]-1, val.invoiceDate[2])),
                            dueDate: this.formatDate(new Date(val.dueDate[0], val.dueDate[1]-1, val.dueDate[2])),
                            //invoiceType: val.invoiceType,
                            totalAmount: val.totalAmount,
                            amount: val.amount,
                            addlAmount: val.addlAmount,
                            additionalGst : val.additionalGst || 0,
                            gstAmount: val.gstAmount,
                            paymentTerm: val.paymentTerm,
                            paymentMethod: val.paymentMethod,
                            uploadInvoice: '',
                            invoiceDtl: []
                        });
                        val.invoiceDtl.forEach((row: any)=>{
                            this.totalArray.push(row.amount);
                            this.taxArray.push(row.taxValue);
                            this.addItem(row)
                        })

                    }
                })
        })
       
    }

    addInvoiceAmount(type?: string, val?: any) {
        // @ts-ignore
        this.addlAmount_1 = this.invoiceForm.controls.addlAmount.value;
        // @ts-ignore
        this.gstAmount_1 = this.invoiceForm.controls.gstAmount.value;
        // @ts-ignore
        this.amount_1 = this.invoiceForm.controls.amount.value;
        // @ts-ignore
        this.additionalGst = this.invoiceForm.controls.additionalGst.value

        // @ts-ignore
        this.invoiceForm.controls.totalAmount.setValue(Number(Number(this.amount_1) + Number(this.gstAmount_1) + Number(this.addlAmount_1)+ Number(this.additionalGst)).toFixed(2))
    }

    deleteInvoiceDocument(documentId:string){
        this.companyService.deleteDocuments(documentId).subscribe(res=>{
            if(res.code=='1')
            {
                this._route.params.subscribe(param => {
                // @ts-ignore
                this.companyService.getDocuments(param?.id).subscribe(res2=>{
                    this.documents = res2.results
                })
            })
            }
        })
    }

    private formatDate(date: any) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    }

    checkInvoiceNumber (target?: any) {
        if (target.value.length > 2){
            const cId =  this.invoiceForm.getRawValue().companyId
            const vId =  this.invoiceForm.getRawValue().vendorId
            const sId =   this.invoiceForm.getRawValue().storeId

            this.companyService.checkInvoiceNumber(target.value, cId, sId, vId ).subscribe(res=> {
                if (res.code == '1') {
                    if (res.results){
                        this.invoiceForm.controls['invoiceNumber'].setErrors(null)
                        this.isInvoice = false
                    }
                    if (!res.results){
                        this.invoiceForm.controls['invoiceNumber'].setErrors({ isAlready: true })
                        this.isInvoice = true
                    }
                }
            })
        } else {
            this.isInvoice = false
        }
    }

    goBack(){
        this.router.navigate(['invoice-details',this.invoiceId])
    }
}
