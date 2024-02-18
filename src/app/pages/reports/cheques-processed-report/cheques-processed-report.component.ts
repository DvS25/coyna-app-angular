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
  selector: 'app-cheques-processed-report',
  templateUrl: './cheques-processed-report.component.html',
  styleUrls: ['./cheques-processed-report.component.scss']
})
export class ChequesProcessedReportComponent {
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
			start_date: [''],
			end_date: [''],
		},
	);
	
	ngOnInit(): void{
		if (!this.utility.chkPagePermission('FinancialReporting'))
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
		
        this.companyService.fetchReport('cheques-report',params,values).subscribe(res => {
            if (res.code == "1") {
                this.alldata = res.results;
                this.data = res.results;

				this.totpages = Math.ceil(((res.results).length / this.limit));
				console.log(this.totpages);
				var res = alasql('SELECT invoiceNumber,invoiceDate,paymentMode,chequeNumber,paymentDate,amount,clearanceDate,payeeName FROM ? order by invoiceNumber LIMIT '+this.limit+' OFFSET 0',[this.alldata]);
                this.pdata = res;				
            }
        })
    }
	
	myFuncPrevious(){
		if(this.pageno > 1)
		{
			this.pageno = this.pageno - 1;
			
			var res = alasql('SELECT invoiceNumber,invoiceDate,paymentMode,chequeNumber,paymentDate,amount,clearanceDate,payeeName FROM ? order by invoiceNumber LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
            this.pdata = res;
		}
	}
	
	myFuncNext(){
		if(this.pageno < this.totpages)
		{
			this.pageno = this.pageno + 1;
			
			var res = alasql('SELECT invoiceNumber,invoiceDate,paymentMode,chequeNumber,paymentDate,amount,clearanceDate,payeeName FROM ? order by invoiceNumber LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
            this.pdata = res;
		}
	}
	
	myFuncReset(){
		this.myGroup.reset();
		this.myGroup.controls['fin_year'].setValue(2023);
		this.getReports();
		this.getStoreList('');
	}
	
	myFuncApply(){
		this.getReports();
	}
	
	excelDownload(){
		var mystyle = {
			sheetid: 'Cheques Processing Report',
			headers: true,
			caption: {
			  title:'Cheques Processing Report',
			},
			column: {
			  style:'font-size:15px'
			},
			columns: [
			  {columnid:'invoiceNumber'},
			  {columnid:'invoiceDate'},
			  {columnid:'paymentMode'},			  
			  {columnid:'chequeNumber',title: 'Reference Number'},			  
			  {columnid:'paymentDate'},			  
			  {columnid:'amount'},			  
			  {columnid:'clearanceDate'},			  
			  {columnid:'payeeName'}
			]
		};

		
		alasql('SELECT * INTO XLS("Cheques_Processing_Report.xls",?) FROM ?',[mystyle,this.alldata]);
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
		var res = alasql('SELECT invoiceNumber,invoiceDate,paymentMode,chequeNumber,paymentDate,amount,clearanceDate,payeeName FROM ? order by '+colname+' '+this.orderby+' LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
        this.pdata = res;
	}
}
