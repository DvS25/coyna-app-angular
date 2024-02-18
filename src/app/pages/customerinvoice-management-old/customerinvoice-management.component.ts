import {Component, Inject} from '@angular/core';

import {
    AbstractControl, FormArray,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';

import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";
import {Constants, InvoiceManagementService, UtilityHelper} from "../../shared";
import {BrowserDB} from "../../shared";
import {CompanyService} from "../../shared";
import { DOCUMENT } from "@angular/common";

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
     distype = ["%","$"]
     //taxtype = ["CGST-5%","SGST-5%","IGST-10%","CGST-12%","SGST-12%","IGST-24%","CGST-18%","SGST-18%","IGST-36%","CGST-28%","SGST-28%","IGST-56%"]
     taxtype = [
    { id: 1, name: "CGST-5%" },
    { id: 2, name: "SGST-5%" },
    { id: 3, name: "IGST-10%" },
    { id: 4, name: "CGST-12%" },
    { id: 5, name: "SGST-12%" },
    { id: 6, name: "CGST-18%" },
    { id: 7, name: "SGST-18%" },
  ];
    invoiceMaxDate = new Date().toISOString().split("T")[0];
    invoiceMinDate = new Date().toISOString().split("T")[0];
    itemList: any;
    selectedCompanyId: any;

    constructor(
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        private router: Router,
        private constants: Constants,
        private browser: BrowserDB,
        private invoiceService: InvoiceManagementService,
        private companyService: CompanyService,
        private utility: UtilityHelper,
        @Inject(DOCUMENT) document: Document

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
            paymentTerm: ['', [Validators.required]],
            paymentMethod: ['', [Validators.required]],
            goodsDesc: ['', [Validators.nullValidator]],
            uploadInvoice: ['', [Validators.required]],
            storeId: ['', [Validators.required]],
            invoiceDtl: this.formBuilder.array([]),
            invoiceTax: this.formBuilder.array([])
        });
    }

    get f(): { [key: string]: AbstractControl; } {
        return this.invoiceForm.controls;
    }

    get itemFormArray() {
        // @ts-ignore
        return this.f.invoiceDtl as FormArray
    }

    get itemTaxArray() {
        // @ts-ignore
        return this.f.invoiceTax as FormArray
    }

    addItem() {
        this.itemFormArray.push(
            this.formBuilder.group({
                itemId: ['', [Validators.required]],
                quantity: ['', Validators.required],
                uom: ['', [Validators.required]],
                unitPrice: ['', [Validators.required]],
                amount: [''],
                taxName: [''],
                taxValue: [''],
                totalAmount: [''],
            })
        )
    }
    removeItem(index?: any) {
        this.itemFormArray.removeAt(index);
        // @ts-ignore
        this.taxArray.splice(index, 1);
        this.totalArray.splice(index, 1);
        this.invoiceForm.controls['gstAmount'].setValue(Number(this.taxArray.reduce((partialSum, a) => partialSum + a, 0)).toFixed(2))
        this.invoiceForm.controls['amount'].setValue(Number(this.totalArray.reduce((partialSum, a) => partialSum + a, 0)).toFixed(2))

    }

    addTax() {
        this.itemTaxArray.push(
            this.formBuilder.group({
                taxId: ['', [Validators.required]],
                taxtype: ['', Validators.required],
                taxval: ['', [Validators.required]],
                subtotal: [''],
            })
        )
    }
    removeTax(index?: any) {
        this.itemTaxArray.removeAt(index);
        // @ts-ignore
        this.taxArray.splice(index, 1);
        this.totalArray.splice(index, 1);
        this.invoiceForm.controls['gstAmount'].setValue(Number(this.taxArray.reduce((partialSum, a) => partialSum + a, 0)).toFixed(2))
        this.invoiceForm.controls['amount'].setValue(Number(this.totalArray.reduce((partialSum, a) => partialSum + a, 0)).toFixed(2))

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
      // @ts-ignore
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
