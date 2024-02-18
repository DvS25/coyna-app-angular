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
import { ToastrService } from 'ngx-toastr';
import alasql from 'alasql';
import * as moment from 'moment';

@Component({
  selector: 'app-sales-performance',
  templateUrl: './sales-performance.component.html',
  styleUrls: ['./sales-performance.component.scss']
})
export class SalesPerformanceComponent {
	showPage:boolean = true;
	companyList: any;
	storeList: any;
	firstItemId: any;
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
		private toastr: ToastrService,
		private utility: UtilityHelper
	) {
		this.getCompanies();		
	}
	
	myGroup: FormGroup = this.formBuilder.group(
		{
			fin_year: ['2023'],
			parentCompanyId: [''],
			storeId: [''],
			month: ['12'],
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
		else
		{
			this.toastr.error('Please Select Finanace Year');
			return;
		}
		if(this.myGroup.value.parentCompanyId != '' && this.myGroup.value.parentCompanyId != null)
		{
			params = params + ",company-id";
			values = values + ","+this.myGroup.value.parentCompanyId;
		}
		if(this.myGroup.value.storeId != '' && this.myGroup.value.storeId != null)
		{
			params = params + ",store-id";
			values = values + ","+this.myGroup.value.storeId;
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
		
        this.companyService.fetchReport('salesperformance-report',params,values).subscribe(res => {
            if (res.code == "1") {
                this.alldata = res.results;
                this.data = res.results;
				
				this.totpages = Math.ceil(((res.results).length / this.limit));
				console.log(this.alldata);
				var res = alasql('SELECT itemName,[target] as [targetval],week1,week2,week3,week4,week5,[total] as [totalval],ROUND(totalPercentage,2) as totalPercentage,differenceCE FROM ? order by itemName LIMIT '+this.limit+' OFFSET 0',[this.alldata]);
                this.pdata = res;
            }
        })
    }
	
	myFuncPrevious(){
		if(this.pageno > 1)
		{
			this.pageno = this.pageno - 1;
			
			var res = alasql('SELECT itemName,[target] as [targetval],week1,week2,week3,week4,week5,[total] as [totalval],ROUND(totalPercentage,2) as totalPercentage,differenceCE FROM ? order by itemName LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
            this.pdata = res;
		}
	}
	
	myFuncNext(){
		if(this.pageno < this.totpages)
		{
			this.pageno = this.pageno + 1;
			
			var res = alasql('SELECT itemName,[target] as [targetval],week1,week2,week3,week4,week5,[total] as [totalval],ROUND(totalPercentage,2) as totalPercentage,differenceCE FROM ? order by itemName LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
            this.pdata = res;
		}
	}
	
	

	myFuncReset(){
		this.myGroup.reset();
		this.myGroup.controls['fin_year'].setValue(2023);
		this.myGroup.controls['month'].setValue(12);
		this.getReports();
		this.getStoreList('');
	}
	
	myFuncApply(){
		this.getReports();
	}
	
	excelDownload(){
		var mystyle = {
			sheetid: 'Sales Performance Report',
			headers: true,
			caption: {
			  title:'Sales Performance Report',
			},
			column: {
			  style:'font-size:15px'
			},
			columns: [
			  {columnid:'itemName'},
			  {columnid:'target'},
			  {columnid:'week1'},			  
			  {columnid:'week2'},			  
			  {columnid:'week3'},			  
			  {columnid:'week4'},			  
			  {columnid:'week5'},			  
			  {columnid:'total'},			  
			  {columnid:'totalPercentage'},			  
			  {columnid:'differenceCE'}
			]
		};
		alasql('SELECT * INTO XLS("Sales_Performance_Report.xls",?) FROM ?',[mystyle,this.alldata]);
	}
	
	myFuncSort(colname:string){		
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
		console.log(colname+","+this.orderby);
		this.lastsortcolumn = colname;
		this.pageno = 1;
		var tmpcol = colname;
		if(tmpcol == 'target')
		{
			tmpcol = 'targetval';
		}
		else if(tmpcol == 'total')
		{
			tmpcol = 'totalval';
		}
		var res = alasql('SELECT itemName,[target] as [targetval],week1,week2,week3,week4,week5,[total] as [totalval],ROUND(totalPercentage,2) as totalPercentage,differenceCE FROM ? order by '+tmpcol+' '+this.orderby+' LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
        this.pdata = res;
	}
}
