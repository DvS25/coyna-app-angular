import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, FormArray, Validators, AbstractControl} from '@angular/forms';
import {BrowserDB, CompanyService, Constants, InvoiceManagementService, blobFileDownload, unquieArray, UtilityHelper} from "../../shared";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-banking-transaction',
  templateUrl: './banking-transaction.component.html',
  styleUrls: ['./banking-transaction.component.scss']
})
export class BankingTransactionComponent {
	bankingTransactionForm: FormGroup = new FormGroup({});
	showPage:boolean = true;
	bankList: any;
	companyList:any=[];
	storeList:any=[];
	filterSubmitted: boolean = false;
	preCloseBalance: number = 0;
	
	filterSearchForm = this.formBuilder.group({
		companyId: ['', Validators.required],
        bankId: ['', Validators.required],
        transDate: ['', Validators.required],
    })
	lastTransaction: any;
	transactionDate: string = '';
	
	constructor(
        private browserDB: BrowserDB,
        private constants: Constants,
        private formBuilder: FormBuilder,
        private companyService: CompanyService,
		private toastr: ToastrService,
		private utility: UtilityHelper
    ) {
		this.buildForm();
		this.getCompanies();
    }
	
	buildForm() {        
        this.bankingTransactionForm = this.formBuilder.group({
            bt_rows: this.formBuilder.array([])
        });
    }
	
	get bt_rows(): FormArray {
        return this.bankingTransactionForm.get('bt_rows') as FormArray;
    }

	
	ngOnInit() {   
		if (!this.utility.chkPagePermission('Banking'))
		{
			this.showPage = false;
		}
	}


	getCompanies() {
        this.companyService.getCompany().subscribe(res => {
            if (res.code == "1") {
                this.companyList = res.results;
            }
        })
    }
    getStores(val: any) {
		this.storeList=[]
        this.companyService.getStore(val.value)
            .subscribe(res => {
                if (res.code == "1") {
                    this.storeList = res.results;
                }
            })
    }

	getBanks(target:any){
		this.bankList=[]
		this.companyService.getAllBanks({company_id:target.value}).subscribe(res => {
            if (res.code == '1') {
                this.bankList = res.results;
            }
        })
	}

	initTransactionRows(openingAmount:any){
		let newBTRow = this.formBuilder.group({
			bankId:new FormControl(this.filterSearchForm.value.bankId),
			transactionDate:new FormControl(this.transactionDate),
			transactionType: new FormControl(),
			transactionNo: new FormControl(),
			subType : new FormControl(),
			va_particulars: new FormControl('Cash_Deposit'),
			debitAmount: new FormControl('0',[Validators.required]),
			creditAmount: new FormControl('0',[Validators.required]),
			openingAmount: new FormControl(openingAmount),
			closingAmount: new FormControl(openingAmount),
			description: new FormControl('',[Validators.required])
		});
		this.preCloseBalance = openingAmount
		this.bt_rows.push(newBTRow);
		console.log(this.bt_rows)
	}
	
	get f() {
		return this.filterSearchForm.controls;
    }
	
	filterSearch(){
		console.log("start");
		this.filterSubmitted = true;
		if (this.filterSearchForm.invalid) {
			this.toastr.error("Fields Missing.");
            return;
        }
		console.log("end");
		this.filterSubmitted = false;
		/*------------------------------------------------------------*/
		
		this.transactionDate = this.filterSearchForm.value.transDate+"T00:00:00"
		// @ts-ignore
		this.companyService.getCurrentOpeningBalance(this.filterSearchForm.value.bankId).subscribe(res => {
            if (res.code == '1') {
				this.lastTransaction = res.results;
                this.initTransactionRows(this.lastTransaction.closingAmount)
            }
        })
	}
	
	addNewRow(){
		let previousClosingBalance
		if(this.bt_rows.at(this.bt_rows.length-1))
		{
			previousClosingBalance= this.bt_rows.at(this.bt_rows.length-1).value.closingAmount
		}
		else
		{
			this.toastr.error("Please select the bank details")
			return
		}

		let newBTRow = this.formBuilder.group({
			bankId:new FormControl(this.filterSearchForm.value.bankId),
			transactionDate:new FormControl(this.transactionDate),
			transactionType: new FormControl(),
			transactionNo : new FormControl(),
			subType : new FormControl(),
			va_particulars: new FormControl('Cash_Deposit'),
			debitAmount: new FormControl('0',[Validators.required]),
			creditAmount: new FormControl('0',[Validators.required]),
			openingAmount: new FormControl(previousClosingBalance),
			closingAmount: new FormControl(previousClosingBalance),
			description: new FormControl("",[Validators.required])
		});
		this.bt_rows.push(newBTRow);
	}
	
	selectOnFocus(event: any) {
        (event.target as HTMLInputElement).select();
    }
	
	onValueChange(txtval: any, index: number, from_ctrl: any) {
        // const VAControl = this.bt_rows.at(index).get(from_ctrl);
        // if (VAControl) {
        //     VAControl.setValue(txtval.target.value);
        // }
		if(txtval.target.value!=='')
			this.calClosingBalance();
    }

	deleteTransactionRow(index:any){
		this.bt_rows.removeAt(index);
		this.calClosingBalance()
	}
	
	calClosingBalance(){
		var opbal = this.preCloseBalance;
		
		for(var i = 0; i< this.bt_rows.length; i++)
		{
			opbal = opbal + parseFloat(this.bt_rows.at(i).value.creditAmount) - parseFloat(this.bt_rows.at(i).value.debitAmount);
			const formattedOpBal = Number(opbal).toFixed(2)
			this.bt_rows.at(i).get('closingAmount')!.setValue(formattedOpBal);
			if(this.bt_rows.at(i+1))
				this.bt_rows.at(i+1).get('openingAmount')!.setValue(formattedOpBal);
		}
	}
	
	saveBankingTransactions(){
		this.filterSubmitted = true;
		if (this.filterSearchForm.invalid) {
			this.toastr.error("Fields Missing.");
            return;
        }
		this.filterSubmitted = false;
		/*------------------------------------------------------------*/
		console.log("Validation Start");
		var finalObj = [];		
		var va_anyonedata = false;
		var va_alldatafound = true;
		for(var i = 0; i< this.bt_rows.length; i++)
		{
			va_anyonedata = true;
			if(this.bt_rows.value[i].description == '' || this.bt_rows.value[i].debitAmount == '' || this.bt_rows.value[i].creditAmount == ''|| this.bt_rows.value[i].va_particulars=='')
			{
				va_alldatafound = false;
			}
			
		}
		if(va_anyonedata == false)
		{
			this.toastr.error("Please Add Atleast One Record.");
			return;
		}		
		if(va_alldatafound == false)
		{
			this.toastr.error("Please Add All Datas.");
            return;
		}
				
		console.log("Validation end");
		/*------------------------------------------------------------*/
		for(var i = 0; i< this.bt_rows.length; i++)
		{
			//@ts-ignore
			this.bt_rows.at(i)?.get('transactionNo').setValue(Number(i+1)+Number(this.lastTransaction.transactionNo))
			finalObj.push(this.bt_rows.at(i).value);
		}
		this.companyService.createBankTransactions(finalObj).subscribe(res=>{
			if(res.code==='1')
			{
				this.toastr.success("Successfully added the transactions");
				this.bt_rows.clear();
			}
		})
	}
}
