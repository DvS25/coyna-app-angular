import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { CompanyService, UtilityHelper } from 'src/app/shared';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

export interface PeriodicElement {
  bankTransactionId: string;
  bankId: string;
  transactionDate: Date;
  debitAmount: number;
  creditAmount: number;
  openingAmount: number;
  closingAmount: number;
  description: string;
}


@Component({
  selector: 'app-account-transaction',
  templateUrl: './account-transaction.component.html',
  styleUrls: ['./account-transaction.component.scss']
})
export class AccountTransactionComponent{
  showPage: boolean = true;
  dataSource = []
  filterSearchForm = this.formBuilder.group({
		  companyId: ['', Validators.required],
      bankId: ['', Validators.required],
      accountId:['', Validators.required],
      startDate:null,
      endDate:null
    })
    selectedBankAccountId: any='';
    startDate: null | undefined;
    endDate: null | undefined;
    isSearchClicked: boolean = false;
  constructor(
    private service: CompanyService,
    private utility: UtilityHelper,
    private formBuilder: FormBuilder,
    private notification : ToastrService
    
  ) {
    this.getCompanies()
  }
  accountList = []
  companyList = []
  storeList = []
  bankList = []
  pageNo = 1
  pageSize = 10 
  getCompanies() {
    this.service.getCompany().subscribe(res => {
      if (res.code == "1") {
        this.companyList = res.results;
      }
    })
  }

  getBanks(target: any) {
    this.bankList = []
    this.service.getAllBanks({ company_id: target.value }).subscribe(res => {
      if (res.code == '1') {
        this.bankList = res.results;
      }
    })
  }
  getBankAccounts(target:any){
    console.log(target.value, this.bankList)
    this.accountList= this.bankList.filter((bank:any)=>  target.value === bank.bankName)
    console.log(this.accountList)
  }
  saveAccountId(target:any){
    this.selectedBankAccountId=target.value;
  }
  getBankingTransactions() {
    this.isSearchClicked = true
    this.startDate = this.filterSearchForm.value.startDate
    this.endDate = this.filterSearchForm.value.endDate
    console.log(this.startDate, this.endDate)
    if(this.startDate!==null &&  this.endDate!== null)
    {
      //@ts-ignore
      if(this.filterSearchForm.value.startDate>this.filterSearchForm.value.endDate)
      {
        this.notification.error("Start date cannot be after end date")
        return
      }
    }
    else if((this.startDate===null && this.endDate !== null) && (this.startDate!==null && this.endDate === null))
    {
      this.notification.error("Please enter both start and end date")
      return
    }
    if(!this.filterSearchForm.invalid)
    {
    this.service.getBankingTransactions({bank_id:this.selectedBankAccountId},this.startDate,this.endDate, this.pageNo, this.pageSize ).subscribe((res: any) => {
      if (res.code === '1') {
        this.dataSource = res.results;
        console.log(this.dataSource)
      }
    });
    }
    else
      this.notification.error("Please select all the filter values")
  }

  myFuncPrevious(){
    this.pageNo = this.pageNo - 1 
    if(this.pageNo==0)
    {
      this.notification.info("This is the first page")
      this.pageNo = this.pageNo + 1
    }
		this.service.getBankingTransactions({bank_id:this.selectedBankAccountId},this.startDate,this.endDate, this.pageNo, this.pageSize ).subscribe((res: any) => {
      if (res.code === '1') 
      {
        this.dataSource = res.results;
        console.log(this.dataSource)
      }
    });
	}
	
	myFuncNext(){
		this.pageNo = this.pageNo + 1
		this.service.getBankingTransactions({bank_id:this.selectedBankAccountId},this.startDate,this.endDate, this.pageNo, this.pageSize ).subscribe((res: any) => {
      if (res.code === '1') 
      {
        if(res.results.length>0)
        {
        this.dataSource = res.results;
        console.log(this.dataSource)
        }
        else
        {
          this.notification.info("This is the last page")
          this.pageNo = this.pageNo - 1
        }
      }
    });
	}

  resetFilters(){
    this.isSearchClicked = false
    this.startDate = null;
    this.endDate = null;
    this.selectedBankAccountId = null;
    this.filterSearchForm.get('companyId')?.setValue('');
    this.filterSearchForm.get('bankId')?.setValue('');
    this.filterSearchForm.get('accountId')?.setValue('');
    this.dataSource = []
  }
  ngOnInit(): void {
    if (!this.utility.chkPagePermission('Banking')) {
      this.showPage = false;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }
}
