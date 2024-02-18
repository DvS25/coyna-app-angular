import {Component, Inject} from '@angular/core';

import {
    AbstractControl, FormArray,
    FormBuilder,
    FormGroup,
    Validators
}                                   from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import {ToastrService}                                      from 'ngx-toastr';
import {Router}                                             from "@angular/router";
import {Constants, InvoiceManagementService, UtilityHelper} from "../../shared";
import {BrowserDB}                                          from "../../shared";
import {CompanyService}                                     from "../../shared";
import { DOCUMENT }                                         from "@angular/common";
import {TaxComponent}                                       from './tax/tax-components';

@Component({
    selector: 'app-customerinvoice',
    templateUrl: './customerinvoice-management.component.html',
    styleUrls: ['./customerinvoice-management.component.scss']
})
export class CustomerinvoiceComponent {
	showPage:boolean = true;
    // @ts-ignore
    public invoiceForm: FormGroup;
    public companyList: any;
    public vendorList: any;
    public invoiceDoc: any;
    public storeList: any;
     taxArray: any[] = []
    totalArray: any[] = []
    isInvoice: boolean =false

    private quantity = 0;
    private unitPrice = 0;
    private totalTaxPrice = 0;
    private taxValueArray = [];
    private amountArray = [];
    checkI:any[]=[];
    // @ts-ignore
    gstAmount_1: number = 0;
    // @ts-ignore
    addlAmount_1: number = 0;
    // @ts-ignore
    amount_1: number = 0;
    // @ts-ignore
    additionalGst: number = 0;

     uom = ["Kilogram","Gram","Pound","Litre","Gallon"]
    invoiceMaxDate = new Date().toISOString().split("T")[0];
    invoiceMinDate = new Date().toISOString().split("T")[0];
    itemList: any;
    selectedCompanyId: any;
    taxOptions:any=[{id:1,value:'CGST-5%',type:'CGST',percentage:5},{id:2,value:'CGST-12%',type:'CGST',percentage:12},{id:3,value:'CGST-18%',type:'CGST',percentage:18}
    ,{id:4,value:'SGST-5%',type:'SGST',percentage:5},{id:5,value:'SGST-12%',type:'SGST',percentage:12},{id:6,value:'SGST-18%',type:'SGST',percentage:18}];

    constructor(
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        private router: Router,
        private constants: Constants,
        private browser: BrowserDB,
        private invoiceService: InvoiceManagementService,
        private companyService: CompanyService,
        private utility: UtilityHelper,
        @Inject(DOCUMENT) document: Document,
        private dialog: MatDialog

    ) {
        this.getCompanies();
        //this.getVendor();
        this.getItems();
    }

    submitted = false;
    paymentMethodList = [{name: 'Online', id: 1}, {name: 'Cash', id: 2}, {name: "Account Pay", id: 3}];

    ngOnInit(): void {
		if (!this.utility.chkPagePermission('InvoiceManagement'))
		{
			this.showPage = false;
		}
		
        this.invoiceForm = this.formBuilder.group({
            invoiceNumber: ['', [Validators.required]],
            companyId: ['', [Validators.required]],
            vendorId: ['', [Validators.required]],
            invoiceDate: ['', [Validators.required]],
            dueDate: ['', [Validators.required]],
            //invoiceType: ['', [Validators.nullValidator]],
            totalAmount: [{value: '', disabled: true}],
            amount: ['', [Validators.required]],
            addlAmount: ['', [Validators.nullValidator]],
            additionalGst: ['', [Validators.nullValidator]],
            gstAmount: ['', [Validators.nullValidator]],
            discount: ['', [Validators.nullValidator]],
            roundOff: ['', [Validators.nullValidator]],
            paymentTerm: ['', [Validators.required]],
            paymentMethod: ['', [Validators.required]],
            goodsDesc: ['', [Validators.nullValidator]],
            uploadInvoice: ['', [Validators.required]],
            storeId: ['', [Validators.required]],
            invoiceDtl: this.formBuilder.array([])
        });
    }

    get f(): { [key: string]: AbstractControl; } {
        return this.invoiceForm.controls;
    }

    get itemFormArray() {
        // @ts-ignore
        return this.f.invoiceDtl as FormArray
    }

    openDialog() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(TaxComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            data =>{
                if(data){
                    this.taxOptions.push(data);
                }
            })
    }

    show(item:any){
        console.log(item)
    }

    addItem() {
        this.itemFormArray.push(
            this.formBuilder.group({
                itemId: ['', [Validators.required]],
                itemDesc: ['', [Validators.required]],
                quantity: ['', Validators.required],
                uom: ['', [Validators.required]],
                unitPrice: ['', [Validators.required]],
                amount: [''],
                tax: [''],
                discount: [''],
                totalAmount: [''],
            })
        )
    }
    removeItem(index?: any) {
        this.itemFormArray.removeAt(index);
        this.buildTotal();
        // @ts-ignore
       /* this.taxArray.splice(index, 1);
        this.totalArray.splice(index, 1);
        this.invoiceForm.controls['gstAmount'].setValue(Number(this.taxArray.reduce((partialSum, a) => partialSum + a, 0)).toFixed(2))
        this.invoiceForm.controls['amount'].setValue(Number(this.totalArray.reduce((partialSum, a) => partialSum + a, 0)).toFixed(2))
*/
    }

    getCompanies() {
        this.companyService.getCompany().subscribe(res => {
            if (res.code == "1") {
                this.companyList = res.results;
            }
        })
    }

    getVendor(storeTarget:any) {
        console.log("store-Id",storeTarget.value)
        this.companyService.filterAndGetAllVendor({company_id:this.selectedCompanyId,store_id:storeTarget.value})
            .subscribe(res => {
                if (res.code == "1") {
                    this.vendorList = res.results;
                }
            })
    }
    getItems () {
		this.companyService.getCategory("14537667-f4e0-46b9-9dd4-71fc7fbf12d2").subscribe(res=> {
			if (res) {
				this.itemList =  res.results.itemModelList;
			}
		})
	}

    getStore(val: any) {
        const id = val.value;
        this.selectedCompanyId = val.value 
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

    addQuantityAndPrice(type?: string, ix?: any) {

        const _quantity =  Number(this.itemFormArray.controls[ix].value.quantity);
        const _unitPrice =  Number(this.itemFormArray.controls[ix].value.unitPrice);
        let total = _quantity * _unitPrice;
        const _taxPercent:any =  this.itemFormArray.controls[ix].value.tax || 0;
        let _taxValue = 0;
        if(_taxPercent){
            for(let tax of _taxPercent){
                _taxValue += (total* (tax.percentage || 0))/100;
            }
        }
        const discount:any =  this.itemFormArray.controls[ix].value.discount || 0;

        let amount=0;
        if(discount && discount.includes('%')){
            let discountValue = discount.replace('%','');
            discountValue  = (total + _taxValue) * discountValue/100;
            amount = (total + _taxValue) - discountValue;
        }else{
            amount = (total + _taxValue) - discount;
        }

        // @ts-ignore
        this.itemFormArray.controls[ix].controls.amount.setValue(Number(amount).toFixed(2))

        this.buildTotal();
     /* // @ts-ignore
        const _quantity =  Number(document.getElementById(`quantity_${ix}`).value);
        // @ts-ignore
        const _unitPrice =  Number(document.getElementById(`unitPrice_${ix}`).value);
        
        const total = _quantity * _unitPrice;
        
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

        this.invoiceForm.controls['amount'].setValue(Number(this.totalArray.reduce((partialSum, a) => partialSum + a, 0)).toFixed(2));
        this.invoiceForm.controls['gstAmount'].setValue(Number(this.taxArray.reduce((partialSum, a) => Number(partialSum) + Number(a), 0)).toFixed(2));
*/
        
    }

    buildTotal(){

        let subTotalAmount = 0,totalGst = 0,totalDiscount= 0, roundOff = 0, totalAmount=0 ;
        for(let ix in this.itemFormArray.controls){
            const _quantity =  Number(this.itemFormArray.controls[ix].value.quantity);
            const _unitPrice =  Number(this.itemFormArray.controls[ix].value.unitPrice);
            let total = _quantity * _unitPrice;
            subTotalAmount += total;
            const _taxPercent:any =  this.itemFormArray.controls[ix].value.tax || 0;
            let _taxValue = 0;
            if(_taxPercent){
                for(let tax of _taxPercent){
                    _taxValue += (total* (tax.percentage || 0))/100;
                }
            }
            const discount:any =  this.itemFormArray.controls[ix].value.discount || 0;

            let discountValue = 0,amount=0;
            if(discount && discount.includes('%')){
                discountValue = discount.replace('%','');
                discountValue  = (total + _taxValue) * discountValue/100;
                amount = (total + _taxValue) - discountValue;
            }else{
                discountValue = discount;
                amount = (total + _taxValue) - discount;
            }
            totalAmount +=amount;
            totalGst +=_taxValue;
            totalDiscount +=Number(discountValue);
        }
        roundOff = Math.round(totalAmount) - totalAmount;

        this.invoiceForm.controls['amount'].setValue(Number(subTotalAmount).toFixed(2));
        this.invoiceForm.controls['discount'].setValue(Number(totalDiscount).toFixed(2));
        this.invoiceForm.controls['gstAmount'].setValue(Number(totalGst).toFixed(2));
        this.invoiceForm.controls['roundOff'].setValue(Number(roundOff).toFixed(2));
        this.invoiceForm.controls['totalAmount'].setValue(Number(Math.round(totalAmount)).toFixed(2));
    }

    //  ============ FUnction calling ===============
    saveInvoice() {
        this.submitted = true;
        if (this.invoiceForm.invalid) {
            // Scroll to the first invalid element
            const firstInvalidElement = document.querySelector('.ng-invalid');
            if (firstInvalidElement) {
              firstInvalidElement.scrollIntoView({ behavior: 'smooth' });
            }
            return;
          }
        if (this.invoiceForm.value.amount == 0 || this.invoiceForm.value.amount == "0" || !this.invoiceForm.value.amount) {
            console.log('error in amount')
            return;
        }

        if (this.invoiceForm.value.invoiceDtl.length > 0) {
            this.taxValueArray = [] ;
            this.amountArray = [] ;
            for (let val of this.invoiceForm.value.invoiceDtl) {
                // @ts-ignore
                this.taxValueArray.push(Number(val.taxValue));
                // @ts-ignore
                this.amountArray.push(Number(val.amount))
            }
            const sum = this.taxValueArray.reduce((partialSum, a) => partialSum + a, 0);
            const amountSum = this.amountArray.reduce((partialSum, a) => partialSum + a, 0);

            if (Number(amountSum).toFixed(2) > this.invoiceForm.value.amount || Number(amountSum).toFixed(2) < this.invoiceForm.value.amount ) {
                this.notification.error('Your  amount is equal to item amount')
                return;
            }
            if (Number(sum).toFixed(2) > this.invoiceForm.value.gstAmount ||  Number(sum).toFixed(2) < this.invoiceForm.value.gstAmount ) {
                this.notification.error('Your GST price is equal to Tax Value')
                return;
            }
        }
        delete this.invoiceForm.value.uploadInvoice;
        const newObj = {
            ...this.invoiceForm.value,
            totalAmount: Number(this.invoiceForm.value.amount) + Number(this.invoiceForm.value.gstAmount) + Number(this.invoiceForm.value.addlAmount) + Number(this.invoiceForm.value.additionalGst),
            dueDate: new Date(this.invoiceForm.value.dueDate),
            invoiceDate: new Date(this.invoiceForm.value.invoiceDate),
        }
        console.log(newObj)
        this.invoiceService.addInvoice(newObj)
            .subscribe(res => {
                if (res.code == "1") {
                    this.invoiceUpload(res.results);
                }
            })
    }

    invoiceUpload(id: any) {
        const formData = new FormData();
        formData.append('documents', this.invoiceDoc);
        this.invoiceService.upload(id, formData)
            .subscribe(response => {
                if (response.code == '1') {
                    this.submitted = false;
                    this.notification.success('Invoice created successfully');
                    this.invoiceForm.reset();
                    this.submitted = false;
                    // window.location.reload();
                }
            })
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

    protected readonly Number = Number;
}
