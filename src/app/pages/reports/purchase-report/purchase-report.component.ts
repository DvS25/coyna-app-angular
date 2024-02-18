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
  selector: 'app-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.scss']
})
export class PurchaseReportComponent {
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

		if(params != '')
		{
			params = params.substr(1);
			values = values.substr(1);
		}
		
        this.companyService.fetchReport('purchase-report',params,values).subscribe(res => {
            if (res.code == "1") {
                this.alldata = res.results;
                this.data = res.results;

				this.totpages = Math.ceil(((res.results).length / this.limit));
				console.log(this.totpages);
				var res = alasql('SELECT supplierName,jan,feb,mar,april,may,june,july,aug,sep,oct,nov,dec,`total` FROM ? order by item LIMIT '+this.limit+' OFFSET 0',[this.alldata]);
                this.pdata = res;				
            }
        })
    }
	
    
	myFuncPrevious(){
		if(this.pageno > 1)
		{
			this.pageno = this.pageno - 1;
			
			var res = alasql('SELECT supplierName,jan,feb,mar,april,may,june,july,aug,sep,oct,nov,dec,`total` FROM ? order by item LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
            this.pdata = res;
		}
	}
	
	myFuncNext(){
		if(this.pageno < this.totpages)
		{
			this.pageno = this.pageno + 1;
			
			var res = alasql('SELECT supplierName,jan,feb,mar,april,may,june,july,aug,sep,oct,nov,dec,`total` FROM ? order by item LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
            this.pdata = res;
		}
	}
	
	myFuncReset(){
		this.myGroup.reset();
		this.myGroup.controls['fin_year'].setValue(2023);		
		this.getStoreList('');
		this.getReports();
	}
	
	myFuncApply(){
		this.getReports();
	}
	
	excelDownload(){
		var mystyle = {
			sheetid: 'Purchase Report',
			headers: true,
			caption: {
			  title:'Purchase Report',
			},
			column: {
			  style:'font-size:15px'
			},
			columns: [
			  {columnid:'supplierName'},
			  {columnid:'jan'},
			  {columnid:'feb'},			  
			  {columnid:'mar'},			  
			  {columnid:'april'},			  
			  {columnid:'may'},			  
			  {columnid:'june'},
        {columnid:'july'},
        {columnid:'aug'},
        {columnid:'sep'},
        {columnid:'oct'},
        {columnid:'nov'},
        {columnid:'dec'},
        {columnid:'total'},
			]
		};
		alasql('SELECT * INTO XLS("Purchase_Reports.xls",?) FROM ?',[mystyle,this.alldata]);
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
		var res = alasql('SELECT supplierName,jan,feb,mar,april,may,june,july,aug,sep,oct,nov,dec,`total` FROM ? order by '+colname+' '+this.orderby+' LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
        this.pdata = res;
	}
}
