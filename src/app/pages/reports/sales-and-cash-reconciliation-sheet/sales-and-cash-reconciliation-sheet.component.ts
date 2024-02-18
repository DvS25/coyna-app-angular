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
import { CompanyService } from 'src/app/shared';
import { ToastrService } from 'ngx-toastr';
import alasql from 'alasql';

@Component({
  selector: 'app-sales-and-cash-reconciliation-sheet',
  templateUrl: './sales-and-cash-reconciliation-sheet.component.html',
  styleUrls: ['./sales-and-cash-reconciliation-sheet.component.scss']
})
export class SalesAndCashReconciliationSheetComponent {
  companyList: any;
	storeList: any;
	alldata: any = [];
	data: any = [];
	pdata: any = [];
	pageno: number = 1;
  sDate:any;
  eDate:any;
	limit: number = 10;
	totpages: number = 0;
	orderby: string = "asc";
	lastsortcolumn: string = "";
  errorMessage: string = "";
  showPage = true;
  resLength:any;

  constructor(
		private formBuilder: FormBuilder,
        private companyService: CompanyService,
        private toastr: ToastrService
        ) {
         // const date = new Date();


		this.getCompanies();
    }

    

    myGroup: FormGroup = this.formBuilder.group(
      {       
        parentCompanyId: [''],
        storeId: [''],
        startDate: ['2023-05-08'],
        endDate: ['2023-05-15'],     
      },
    );

  ngOnInit(): void{
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
		if(this.myGroup.value.startDate != '')
		{
			params = params + ",start-date";
			values = values + ","+this.myGroup.value.startDate;
		}
    if(this.myGroup.value.endDate != '')
		{
      this.sDate = new Date(this.myGroup.value.startDate); // Set your start date here
      this.eDate = new Date(this.myGroup.value.endDate); // Set your end date here
    
      var diffInMilliseconds = Math.abs(this.eDate - this.sDate);
      var diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
      //console.log("hello",diffInDays);
      if(diffInDays != 7){       
        this.toastr.error("Date range has to be a week(7 days)");
        return;
      }
      
        params = params + ",end-date";
			  values = values + ","+this.myGroup.value.endDate;
    
			
		}
    
		if(params != '')
		{
			params = params.substr(1);
			values = values.substr(1);
		}
		
        this.companyService.fetchReport('salesrecon-report',params,values).subscribe(res => {
            if (res.code == "1") {
				        console.log(res.results)
                this.alldata = res.results;
                this.data = res.results;

				this.totpages = Math.ceil(((res.results).length / this.limit));
				console.log(this.totpages);
				var res = alasql('SELECT * FROM ? order by item LIMIT '+this.limit+' OFFSET 0',[this.alldata]);
                this.pdata = res;
				this.resLength = this.pdata.length;				
            }
            
        }/*, err => {
          this.pdata=[]
        }*/
        )
    }
	
	getOrderedCol () {
		var keys = this.pdata && this.pdata[0] && Object.keys(this.pdata[0]) || [];
		var selectedCol: any = [];
		console.log(this.pdata);
		if(this.pdata.length > 0){
			selectedCol.push('Title')
			for(var i=0;i<keys.length;i++) {
				if(keys[i] !== 'Title') {
					selectedCol.push(keys[i]);
				}
			}
		}
		return selectedCol;
	}
	
    getHeadings(){
      var that = this;
      const firstObject = that.pdata[0];
      const values: any[] = [];
      for (const key in firstObject) {
        if (firstObject.hasOwnProperty(key)) {
          values.push(key);				
        }
      }
      console.log('getHeadings:', values);
      return values;
    }

	myFuncPrevious(){
		if(this.pageno > 1)
		{
			this.pageno = this.pageno - 1;
			
			var res = alasql('SELECT * FROM ? order by item LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
            this.pdata = res;
		}
	}
	
	myFuncNext(){
		if(this.pageno < this.totpages)
		{
			this.pageno = this.pageno + 1;
			
			var res = alasql('SELECT * FROM ? order by item LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
            this.pdata = res;
		}
	}
	
	myFuncReset(){
		this.myGroup.reset();
		
    this.myGroup.controls['startDate'].setValue('2023-05-08');
		this.myGroup.controls['endDate'].setValue('2023-05-15');
    this.getReports();
		this.getStoreList('');
	}
  checkEndDate(startDate:any,endDate:any)
  {
    const start = new Date(startDate);
    const end = new Date(start);

    // Calculate the end date as 6 days after the start date
    end.setDate(start.getDate() + 6);

    endDate(end.toDateString());
    console.log(end.toDateString());
  }
	
	myFuncApply(){
    
   // this.checkEndDate(this.myGroup.value.startDate,this.myGroup.value.endDate);
		this.getReports();
	}

  getExcelColumns() {
	var keys = this.pdata && this.pdata[0] && Object.keys(this.pdata[0]) || [];
	const values: any[] = [];
	values.push({columnid:'Title' });
	for(var i=0;i<keys.length;i++) {
		if(keys[i] !== 'Title') {
			
			values.push({columnid:keys[i] });
		}
	}
	return values;
		/*const firstObject = this.pdata[0];
		const values: any[] = [];
		for (const key in firstObject) {
			if (firstObject.hasOwnProperty(key)) {
				values.push({
					columnid: key
				});
			}
		}
		return values;*/
	}

	
	excelDownload(){
		var mystyle = {
			sheetid: 'Sales and Cash Reconciliation Sheet Report',
			headers: true,
			caption: {
			  title:'Sales and Cash Reconciliation Sheet Report',
			},
			column: {
			  style:'font-size:15px'
			},
			columns: this.getExcelColumns()
		};
		alasql('SELECT * INTO XLS("Sales_and_Cash_Reconciliation_Sheet_Reports.xls",?) FROM ?',[mystyle,this.alldata]);
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
		var res = alasql('SELECT * FROM ? order by '+colname+' '+this.orderby+' LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
        this.pdata = res;
	}
}
