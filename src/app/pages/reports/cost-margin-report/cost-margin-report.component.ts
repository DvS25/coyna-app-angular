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
  selector: 'app-cost-margin-report',
  templateUrl: './cost-margin-report.component.html',
  styleUrls: ['./cost-margin-report.component.scss']
})
export class CostMarginReportComponent {
	showPage:boolean = true;
	companyList: any;
	storeList: any;
	itemList: any;
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
			itemId: [''],
			start_date: [''],
			end_date: [''],
		},
	);
	
	ngOnInit(): void{
		if (!this.utility.chkPagePermission('FinancialReporting'))
		{
			this.showPage = false;
		}
		this.getItems();		
	}

	getCompanies () {
		this.companyService.getCompany().subscribe(res=> {
			if (res) {
				this.companyList =  res.results;
			}
		})
	}

	getItems () {
		this.companyService.getCategory("7339e27d-79fe-4e9e-a9aa-590c532497f0").subscribe(res=> {
			if (res) {
				this.itemList =  res.results.itemModelList;
				if((this.itemList).length > 0)
				{
					this.firstItemId = (this.itemList)[0].name;
					this.myGroup.controls['name'].setValue(this.firstItemId);
				}
				this.getReports();
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
		if(this.myGroup.value.itemId != '' && this.myGroup.value.itemId != null)
		{
			params = params + ",item-id";
			values = values + ","+this.myGroup.value.itemId;
		}
		else
		{
			this.toastr.error('Please Select Item');
			return;
		}
		var sdate = false;var edate = false;
		if(this.myGroup.value.start_date != '' && this.myGroup.value.start_date != null)
		{
			sdate = true;
			params = params + ",start-date";
			values = values + ","+this.myGroup.value.start_date;
		}
		if(this.myGroup.value.end_date != '' && this.myGroup.value.end_date != null)
		{
			edate = true;
			params = params + ",end-date";
			values = values + ","+this.myGroup.value.end_date;
		}
		
		if(sdate == true && edate == true)
		{
			if(moment(this.myGroup.value.start_date) > moment(this.myGroup.value.end_date))
			{
				this.toastr.error('Start Date Should Be Less Than End Date.');
				return;
			}
		}
		
		if(params != '')
		{
			params = params.substr(1);
			values = values.substr(1);
		}
		
        this.companyService.fetchReport('costmargin-report',params,values).subscribe(res => {
            if (res.code == "1") {
                this.alldata = res.results;
                this.data = res.results;

				this.totpages = Math.ceil(((res.results).length / this.limit));
				var res = alasql('SELECT date,type,piQty,piValue,piPerLitre,siQty,siValue,siPerLitre,bqty,bvalue,bperLitre FROM ? order by date LIMIT '+this.limit+' OFFSET 0',[this.alldata]);
                this.pdata = res;
            }
        })
    }
	
	myFuncPrevious(){
		if(this.pageno > 1)
		{
			this.pageno = this.pageno - 1;
			
			var res = alasql('SELECT date,type,piQty,piValue,piPerLitre,siQty,siValue,siPerLitre,bqty,bvalue,bperLitre FROM ? order by date LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
            this.pdata = res;
		}
	}
	
	myFuncNext(){
		if(this.pageno < this.totpages)
		{
			this.pageno = this.pageno + 1;
			
			var res = alasql('SELECT date,type,piQty,piValue,piPerLitre,siQty,siValue,siPerLitre,bqty,bvalue,bperLitre FROM ? order by date LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
            this.pdata = res;
		}
	}
	
	myFuncReset(){
		this.myGroup.reset();
		this.myGroup.controls['fin_year'].setValue(2023);
		this.myGroup.controls['itemId'].setValue(this.firstItemId);
		this.getReports();
		this.getStoreList('');
	}
	
	myFuncApply(){
		this.getReports();
	}
	
	excelDownload(){
		var mystyle = {
			sheetid: 'Cost Margin Report',
			headers: true,
			caption: {
			  title:'Cost Margin Report',
			},
			column: {
			  style:'font-size:15px'
			},
			columns: [
			  {columnid:'date'},
			  {columnid:'type'},
			  {columnid:'piQty'},			  
			  {columnid:'piValue'},			  
			  {columnid:'piPerLitre'},			  
			  {columnid:'siQty'},			  
			  {columnid:'siValue'},			  
			  {columnid:'siPerLitre'},			  
			  {columnid:'bqty'},			  
			  {columnid:'bvalue'},			  
			  {columnid:'bperLitre'}
			]
		};
		alasql('SELECT * INTO XLS("Cost_Margin_Report.xls",?) FROM ?',[mystyle,this.alldata]);
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
		var res = alasql('SELECT date,type,piQty,piValue,piPerLitre,siQty,siValue,siPerLitre,bqty,bvalue,bperLitre FROM ? order by '+colname+' '+this.orderby+' LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
        this.pdata = res;
	}
}
