import { Component, OnInit } from '@angular/core';
import axios from 'axios';
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
import {Constants, InvoiceManagementService, blobFileDownload, UtilityHelper} from 'src/app/shared';
import { ToastrService } from 'ngx-toastr';
import alasql from 'alasql';
import * as moment from 'moment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-supplier-statement',
  templateUrl: './supplier-statement.component.html',
  styleUrls: ['./supplier-statement.component.scss']
})
export class SupplierStatementComponent {
	showPage:boolean = true;
	companyList: any;
	storeList: any;
	vendorList: any;
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
		private invoiceService: InvoiceManagementService,
		private toastr: ToastrService,
		private router: Router,
		private utility: UtilityHelper
	) {
		this.getCompanies();		
	}
	
    public progressBar: boolean = false;
	myGroup: FormGroup = this.formBuilder.group(
		{
			fin_year: ['2023'],
			parentCompanyId: [''],
			storeId: [''],
			vendorId: [''],
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
		this.getVendor();		
	}

	getCompanies () {
		this.companyService.getCompany().subscribe(res=> {
			if (res) {
				this.companyList =  res.results;
			}
		})
	}

	getDownload(id?: string, name?: string) {
		
        this.invoiceService.docDownload(id)
            .subscribe(res=> {
                console.log('.......', res)
                blobFileDownload(res, name)
            })
    }

	/*viewInvoice(id: string) {
        // this.viewDiv= true
        // this.listDiv = false
		var params = '';
		var values = '';
		 
		
		if(this.myGroup.value.fin_year != '')
		{
			params = params + "year";
			values = values +this.myGroup.value.fin_year;
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
		if(this.myGroup.value.vendorId != '' && this.myGroup.value.vendorId != null)
		{
			params = params + ",vendor-id";
			values = values + ","+this.myGroup.value.vendorId;
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
		
		
        this.router.navigate(['supplier-detail', id,params,values])
        // this.companyService.getInvoiceDetails(id).subscribe(res=> {
        //     if (res.code === '1'){
        //         // this.editInvoiceForm.setValue({
        //         //     invoiceNumber: res.invoiceNumber
        //         // })
        //     }
        // });
    }*/

	getVendor() {
        this.companyService.getVendor()
		.subscribe(res => {
			if (res.code == "1") {
				this.vendorList = res.results;
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
		if(this.myGroup.value.vendorId != '' && this.myGroup.value.vendorId != null)
		{
			params = params + ",vendor-id";
			values = values + ","+this.myGroup.value.vendorId;
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
		
        this.companyService.fetchReport('supplierst-report',params,values).subscribe(res => {
            if (res.code == "1") {
                this.alldata = res.results;
                this.data = res.results;

				this.totpages = Math.ceil(((res.results).length / this.limit));
				var res = alasql('SELECT documentId,documentName,invoiceNumber,invoiceDate,amount,gstAmount,addlAmount,totalAmount FROM ? order by serialNumber LIMIT '+this.limit+' OFFSET 0',[this.alldata]);
                this.pdata = res;
            }
        })
    }
	
	myFuncPrevious(){
		if(this.pageno > 1)
		{
			this.pageno = this.pageno - 1;
			
			var res = alasql('SELECT documentId,documentName,invoiceNumber,invoiceDate,amount,gstAmount,addlAmount,totalAmount FROM ? order by serialNumber LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
            this.pdata = res;
		}
	}
	
	myFuncNext(){
		if(this.pageno < this.totpages)
		{
			this.pageno = this.pageno + 1;
			
			var res = alasql('SELECT documentId,documentName,invoiceNumber,invoiceDate,amount,gstAmount,addlAmount,totalAmount FROM ? order by serialNumber LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
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
			sheetid: 'Supplier Statement Report',
			headers: true,
			caption: {
			  title:'Supplier Statement Report',
			},
			column: {
			  style:'font-size:15px'
			},
			columns: [
			  {columnid:'documentName'},			  
			  {columnid:'invoiceNumber'},			  
			  {columnid:'invoiceDate'},			  
			  {columnid:'amount'},
			  {columnid:'gstAmount'},
			  {columnid:'addlAmount'},
			  {columnid:'totalAmount'},
			]
		};
		alasql('SELECT * INTO XLS("Supplier_Statement_Report.xls",?) FROM ?',[mystyle,this.alldata]);
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
		var res = alasql('SELECT documentId,documentName,invoiceNumber,invoiceDate,amount,gstAmount,addlAmount,totalAmount FROM ? order by '+colname+' '+this.orderby+' LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
        this.pdata = res;
	}
	
}
