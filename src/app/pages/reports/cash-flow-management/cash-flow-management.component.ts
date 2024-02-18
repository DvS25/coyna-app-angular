import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators
} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyService, UtilityHelper } from 'src/app/shared';
import alasql from 'alasql';

@Component({
  selector: 'app-cash-flow-management',
  templateUrl: './cash-flow-management.component.html',
  styleUrls: ['./cash-flow-management.component.scss']
})
export class CashFlowManagementComponent {
	showPage:boolean = true;
	companyList: any;
	storeList: any;
	alldata: any = [];
	data: any = [];
	pdata: any = [];
	pageno: number = 1;
	limit: number = 10;
	totpages: number = 0;
	orderby: string = "asc";
	lastsortcolumn: string = "";

  constructor(
		private formBuilder: FormBuilder,
        private companyService: CompanyService,
		private utility: UtilityHelper
        ) {
		this.getCompanies();
    }

    myGroup: FormGroup = this.formBuilder.group(
      {
        fin_year: ['2023'],
        parentCompanyId: [''],
        storeId: [''],
        date: [''],
        month: ['12'],
        reviewBy: ['month'],
      },
    );

	ngOnInit(): void{
		if (!this.utility.chkPagePermission('ManagementReports'))
		{
			this.showPage = false;
		}
		this.getReports();
	}

  getCompanies () {
    this.companyService.getCompany().subscribe(res=> {
        if (res) {
            this.companyList =  res.results;
        }
    })
  }

  
	getStoreList(val: any) {
    this.companyService.getStore(val.value).subscribe(res => {
        if (res) {
            console.log('ssssss', res.results)
            this.storeList = res.results;
        }
    })
}


  getReports() {
		var params = '';
		var values = '';
		
		if(this.myGroup.value.fin_year != '')
		{
			params = params + ",year";
			values = values + ","+this.myGroup.value.fin_year;
		}
		if(this.myGroup.value.parentCompanyId != '')
		{
			params = params + ",company-id";
			values = values + ","+this.myGroup.value.parentCompanyId;
		}
    if(this.myGroup.value.storeId != '')
		{
			params = params + ",store-id";
			values = values + ","+this.myGroup.value.storeId;
		}
		if(this.myGroup.value.date != '')
		{
			params = params + ",date";
			values = values + ","+this.myGroup.value.date;
		}
    if(this.myGroup.value.month != '')
		{
			params = params + ",month";
			values = values + ","+this.myGroup.value.month;
		}
   

		if(params != '')
		{
			params = params.substr(1);
			values = values.substr(1);
		}
		
        this.companyService.fetchReport('cashflow-report',params,values).subscribe(res => {
            if (res.code == "1") {
                this.alldata = res.results;
                this.data = res.results;

				this.totpages = Math.ceil(((res.results).length / this.limit));
				console.log(this.totpages);
				var res = alasql('SELECT serialNumber,bankName,balanceAsPerBankStatement,paymentDue,bankDeposit,borrowingLimit,arrangeBalance,withoutDeposit FROM ? order by item LIMIT '+this.limit+' OFFSET 0',[this.alldata]);
                this.pdata = res;				
            }
        })
    }
	
    
		myFuncPrevious(){
      if(this.pageno > 1)
      {
        this.pageno = this.pageno - 1;
        
        var res = alasql('SELECT serialNumber,bankName,balanceAsPerBankStatement,paymentDue,bankDeposit,borrowingLimit,arrangeBalance,withoutDeposit FROM ? order by item LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
              this.pdata = res;
      }
    }
    
    myFuncNext(){
      if(this.pageno < this.totpages)
      {
        this.pageno = this.pageno + 1;
        
        var res = alasql('SELECT serialNumber,bankName,balanceAsPerBankStatement,paymentDue,bankDeposit,borrowingLimit,arrangeBalance,withoutDeposit FROM ? order by item LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
              this.pdata = res;
      }
    }
    
    myFuncReset(){
      this.myGroup.reset();
      this.getReports();
    }
    
    myFuncApply(){
      this.getReports();
    }
    
    excelDownload(){
      var mystyle = {
        sheetid: 'Cash Flow Report',
        headers: true,
        caption: {
          title:'Cash Flow Report',
        },
        column: {
          style:'font-size:15px'
        },
        columns: [
          {columnid:'serialNumber'},
          {columnid:'bankName'},
          {columnid:'balanceAsPerBankStatement'},			  
          {columnid:'paymentDue'},			  
          {columnid:'bankDeposit'},			  
          {columnid:'borrowingLimit'},			  
          {columnid:'arrangeBalance'},
          {columnid:'withoutDeposit'},
          
        ]
      };
      alasql('SELECT * INTO XLS("Cash_Flow_Reports.xls",?) FROM ?',[mystyle,this.alldata]);
    }
    
    myFuncSort(colname:string){
      console.log(colname);
      if(this.lastsortcolumn == colname)
      {
        if(this.orderby == "desc")
        {
          this.orderby = "asc";
        }
        else
        {
          this.orderby = "desc";
        }
      }		
      else
      {
        this.orderby = "asc";
      }
      
      this.lastsortcolumn = colname;
      this.pageno = 1;
      var res = alasql('SELECT serialNumber,bankName,balanceAsPerBankStatement,paymentDue,bankDeposit,borrowingLimit,arrangeBalance,withoutDeposit FROM ? order by '+colname+' '+this.orderby+' LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
          this.pdata = res;
    }
}
