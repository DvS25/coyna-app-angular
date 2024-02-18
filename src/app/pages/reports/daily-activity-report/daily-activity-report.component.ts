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
  selector: 'app-daily-activity-report',
  templateUrl: './daily-activity-report.component.html',
  styleUrls: ['./daily-activity-report.component.scss']
})
export class DailyActivityReportComponent {
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
	site:any;

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
        startDate: ['2023-05-01'],
        endDate: ['2023-05-30'],        
        site: [''],
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
    if(this.myGroup.value.startDate != '')
		{
			params = params + ",start-date";
			values = values + ","+this.myGroup.value.startDate;
		}
    if(this.myGroup.value.endDate != '')
		{
			params = params + ",end-date";
			values = values + ","+this.myGroup.value.endDate;
		}
    if(this.myGroup.value.site != '')
		{
			params = params + ",site";
			values = values + ","+this.myGroup.value.site;
		}
    

		if(params != '')
		{
			params = params.substr(1);
			values = values.substr(1);
		}
		
        this.companyService.fetchReport('dailyactivity-report',params,values).subscribe(res => {
            if (res.code == "1") {
                this.alldata = res.results;
                this.data = res.results;

				this.totpages = Math.ceil(((res.results).length / this.limit));
				console.log(this.totpages);
				var res = alasql('SELECT `total`,sumFuelSaleGas,sumFuelSaleDiesel,sumSRItemSales,sumPurchase,sumTobacco,sumLotto,sumOthers,sumIncomm,sumCigarettes,round(margin,2) as margin FROM ? order by item LIMIT '+this.limit+' OFFSET 0',[this.alldata]);
                this.pdata = res;				
            }
        })
    }
	
    
	myFuncPrevious(){
		if(this.pageno > 1)
		{
			this.pageno = this.pageno - 1;
			
			var res = alasql('SELECT `total`,sumFuelSaleGas,sumFuelSaleDiesel,sumSRItemSales,sumPurchase,sumTobacco,sumLotto,sumOthers,sumIncomm,sumCigarettes,round(margin,2) as margin FROM ? order by item LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
            this.pdata = res;
		}
	}
	
	myFuncNext(){
		if(this.pageno < this.totpages)
		{
			this.pageno = this.pageno + 1;
			
			var res = alasql('SELECT `total`,sumFuelSaleGas,sumFuelSaleDiesel,sumSRItemSales,sumPurchase,sumTobacco,sumLotto,sumOthers,sumIncomm,sumCigarettes,round(margin,2) as margin FROM ? order by item LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
            this.pdata = res;
		}
	}
	
	myFuncReset(){
		this.myGroup.reset();
		this.myGroup.controls['fin_year'].setValue(2023);
		this.getStoreList('');
		this.getReports();
		//this.myGroup.controls['startDate'].setValue('2023-05-01');
		//this.myGroup.controls['endDate'].setValue('2023-05-30');
	
	}
	
	myFuncApply(){
		this.getReports();
	}
	
	excelDownload(){
		var mystyle = {
			sheetid: 'Daily Activity Report',
			headers: true,
			caption: {
			  title:'Daily Activity Report',
			},
			column: {
			  style:'font-size:15px'
			},
			columns: [
			  {columnid:'total'},
			  {columnid:'sumFuelSaleGas'},
			  {columnid:'sumFuelSaleDiesel'},			  
			  {columnid:'sumSRItemSales'},			  
			  {columnid:'sumPurchase'},
        {columnid:'sumTobacco'},
        {columnid:'sumLotto'},
        {columnid:'sumOthers'},
        {columnid:'sumIncomm'},
        {columnid:'sumCigarettes'},
        {columnid:'margin'},
			]
		};
		alasql('SELECT * INTO XLS("Daily_Activity_Reports.xls",?) FROM ?',[mystyle,this.alldata]);
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
		var res = alasql('SELECT `total`,sumFuelSaleGas,sumFuelSaleDiesel,sumSRItemSales,sumPurchase,sumTobacco,sumLotto,sumOthers,sumIncomm,sumCigarettes,round(margin,2) as margin FROM ? order by '+colname+' '+this.orderby+' LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
        this.pdata = res;
	}
}
