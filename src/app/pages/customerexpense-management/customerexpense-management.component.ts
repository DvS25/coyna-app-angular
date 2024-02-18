import {Component} from '@angular/core';
import {
    AbstractControl,
    FormBuilder, FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";
import {Constants} from "../../shared";
import {BrowserDB} from "../../shared";
import {CompanyService, UtilityHelper} from "../../shared";


export interface fileNames  {
    type: string
    name: string
}
@Component({
    selector: 'app-customerexpense',
    templateUrl: './customerexpense-management.component.html',
    styleUrls: ['./customerexpense-management.component.scss']
})
export class CustomerexpenseComponent {
    constructor(
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        private router: Router,
        private constants: Constants,
        private browser: BrowserDB,
        private service: CompanyService,
        private utility: UtilityHelper
    ) {
    }
    chartList = [
        'Accounting Services',
        'Management Fee',
        'Administration (Lotto)',
        'Monitoring of Alarm System',
        'Bulloch Tech',
        'Payroll Processing Expense',
        'Business License',
        'Penalty Charges',
        'Business Meals & Entertainment',
        'Penalty on utility bills',
        'Business Vehicle Insurance',
        'Postage Expense',
        'Canada Pension Plan (CPP)',
        'Professional Fees',
        'Cash Over/ Short',
        'Property Tax',
        'Cell Phone Expense',
        'Recruitment Charges',
        'Company Vehicle Expense',
        'Salaries - Employees',
        'Credit Card Service Charges',
        'Software Expense',
        'Debit Rental Device',
        'Staff Meal Expense',
        'Debit/Credit Cards Fee',
        'Storage Rent',
        'Electricity',
        'Store Insurance',
        'Employment Insurance (EI)',
        'Store Supplies',
        'Heating (Gas)',
        'Telephone Charges',
        'Insurance Premium',
        'Transportation Charges',
        'Interest Charges',
        'Waste Garbage',
        'Internet Charges',
       ' Water & Sewer',
        'Lease Rent',
        'Maintenance',
        'GST Paid'
    ]

    objectKeys = Object.keys;
	showPage:boolean = true;
    fileNames:fileNames []= [] ;

    // @ts-ignore
    expenseForm: FormGroup;
    submitted = false;
    urls = [];
    pdfSource = '';
    myFiles: string [] = [];
    storeList: any;


    companyList: any;
    paymentMethodList = [{name: 'Online', id: 1}, {name: 'Cash', id: 2}, {name: "Account Pay", id: 3}];


    ngOnInit(): void {
		if (!this.utility.chkPagePermission('ExpenseManagement'))
		{
			this.showPage = false;
		}
		
        this.getCompanies();
        this.expenseForm = this.formBuilder.group(
            {
                eName: ['', [Validators.required]],
                levelName: ['', [Validators.required]],
                travelDate: ['', [Validators.required]],
                totalExpenses: ['', [Validators.required]],
                amount: ['', [Validators.required]],
                travelLocation: ['', [Validators.required]],
                chartOfAccounts:['', []],
                approvalDate: ['', [Validators.required]],
                invoiceNumber: ['', [Validators.required]],
                gstAmount: ['', [Validators.required]],
                partyName: ['', [Validators.required]],
                approvedBy: ['', [Validators.required]],
                paymentDate: ['', [Validators.required]],
                paymentMode: ['', [Validators.required]],
                uploadDoc: ['', [Validators.required]],
                company_id: ['', [Validators.required]],
                store_id: ['', [Validators.required]],
            },
        );
    }


    get f(): { [key: string]: AbstractControl; } {
        return this.expenseForm.controls;
    }

    saveExpense(): void {
        this.submitted = true;
        console.log('>>>>> Controles', this.expenseForm.controls)
        if (this.expenseForm.invalid) {
            // Scroll to the first invalid element
            const firstInvalidElement = document.querySelector('.ng-invalid');
            if (firstInvalidElement) {
              firstInvalidElement.scrollIntoView({ behavior: 'smooth' });
            }
        
            return;
          }
        const newObj = {
            "totalAmount": this.expenseForm.value.totalExpenses,
            "employeeName": this.expenseForm.value.eName,
            // "receipt": this.expenseForm.value.receiptInformation,
            "dateOfExpense": new Date(this.expenseForm.value.travelDate),
            "invoiceDate": new Date(this.expenseForm.value.travelDate),
            "expenseDesc": this.expenseForm.value.travelLocation,
            "level": this.expenseForm.value.levelName,
            "approvedDate": new Date(this.expenseForm.value.approvalDate),
            "approvedBy": this.expenseForm.value.approvedBy,
            "paymentDate": new Date(this.expenseForm.value.paymentDate),
            "invoiceNumber": this.expenseForm.value.invoiceNumber,
            "partyName": this.expenseForm.value.partyName,
            "gstAmount": this.expenseForm.value.totalExpenses,
            "amount": this.expenseForm.value.amount,
            "paymentMode": this.expenseForm.value.paymentMode,
            "companyId": this.expenseForm.value.company_id,
            "storeId": this.expenseForm.value.store_id,
            "chartOfAccounts": this.expenseForm.value.chartOfAccounts,
        }
        this.service.addExpense(newObj).subscribe(
            res => {
                if (res.code == "1") {
                    this.uploadDoc(res.results)
                }
            })
    }
    setTotalExpenses(){
        const amount = Number(this.expenseForm.get('amount')?.value)
        const gst = Number(this.expenseForm.get('gstAmount')?.value)
        const totalExpenses = Number(amount + gst).toFixed(2)
        console.log(amount,gst,totalExpenses)
        this.expenseForm.get('totalExpenses')?.setValue(totalExpenses)
    }

    onSelectFile(event: any, type: string) {

            if (event.target.files && event.target.files[0]) {
                this.utility.fileSize(event.target, '16 MB');
                console.log('eeee')
                if (this.fileNames.some(item => item.name == event.target.files[0].name)) {
                    this.notification.error(`${event.target.files[0].name} file name is all ready used`)
                } else {
                    let filesAmount = event.target.files.length;
                    for (let i = 0; i < filesAmount; i++) {
                        // @ts-ignore
                        this.myFiles.push(event.target.files[i]);

                        this.fileNames.push({name: event.target.files[i].name, type: type});

                        if (event.target.files[0].type == "application/pdf") {
                            this.pdfSource = event.target.files[0].name
                        } else {
                            let reader = new FileReader();
                            reader.onload = (event: any) => {
                                // @ts-ignore
                                this.urls.push(event.target.result);
                            }
                            reader.readAsDataURL(event.target.files[i]);
                        }
                    }
                }
            }
    }

    removeSelectedFile(index: any) {
        this.myFiles.splice(index, 1);
        this.urls.splice(index, 1);
        this.fileNames.splice(index, 1);

        if (this.myFiles.length == 0) {
            this.expenseForm.patchValue({
                uploadDoc: ''
            })
        }
    }

    uploadDoc(id: any) {
        const formData = new FormData();
        for (let i = 0; i < this.myFiles.length; i++) {
            formData.append("documents", this.myFiles[i]);
        }
        this.service.vendorUpload(id, formData)
            .subscribe(response => {
                if (response.code == '1') {
                    this.notification.success(response.message);
                    this.expenseForm.reset();
                    this.submitted = false;
                    this.myFiles.length = 0;
                    window.location.reload()
                }
            })
    }

    getCompanies() {
        this.service.getCompany().subscribe(res => {
            if (res.code == '1') {
                this.companyList = res.results;
            }
        })
    }

    selectCompany(val: any){
        let id = val.value;
        this.service.getStore(id).subscribe(res=> {
            if (res.code == '1') {
                this.storeList = res.results;
            }
        })
    }

}