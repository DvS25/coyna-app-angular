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
  selector: 'app-gmanalysis',
  templateUrl: './gmanalysis.component.html',
  styleUrls: ['./gmanalysis.component.scss']
})
export class GMAnalysisComponent {
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
    
		if(params != '')
		{
			params = params.substr(1);
			values = values.substr(1);
		}
		
        this.companyService.fetchReport('gmanalysis-report',params,values).subscribe(res => {
            if (res.code == "1") {
                this.alldata = res.results;
                this.data = res.results;

				this.totpages = Math.ceil(((res.results).length / this.limit));
				console.log(this.totpages);
				var res = alasql('SELECT month,totalSales,tobaccoSales,ROUND(tobaccoSalesPercentage,2) as tobaccoSalesPercentage,ROUND(calcGM25Percentage,2) as calcGM25Percentage,cigSales,ROUND(cigSalesPercentage,2) as cigSalesPercentage,ROUND(calcGM10Percentage,2) as calcGM10Percentage,lottoSales,ROUND(lottoSalesPercentage,2) as lottoSalesPercentage,prepaidSales,ROUND(prepaidSalesPercentage,2) as prepaidSalesPercentage,otherSales,ROUND(otherSalesPercentage,2) as otherSalesPercentage,ROUND(calcGM40Percentage,2) as calcGM40Percentage,actualGM,ROUND(actualGMPercentage,2) as actualGMPercentage,calculatedGM,ROUND(calculatedGMPercentage,2) as calculatedGMPercentage,ROUND(lcalcGM5Percentage,2) as lcalcGM5Percentage,ROUND(pcalcGM5Percentage,2) as pcalcGM5Percentage FROM ? order by item LIMIT '+this.limit+' OFFSET 0',[this.alldata]);
                this.pdata = res;				
            }
        })
    }
	
    
	myFuncPrevious(){
		if(this.pageno > 1)
		{
			this.pageno = this.pageno - 1;
			
			var res = alasql('SELECT month,totalSales,tobaccoSales,ROUND(tobaccoSalesPercentage,2) as tobaccoSalesPercentage,ROUND(calcGM25Percentage,2) as calcGM25Percentage,cigSales,ROUND(cigSalesPercentage,2) as cigSalesPercentage,ROUND(calcGM10Percentage,2) as calcGM10Percentage,lottoSales,ROUND(lottoSalesPercentage,2) as lottoSalesPercentage,prepaidSales,ROUND(prepaidSalesPercentage,2) as prepaidSalesPercentage,otherSales,ROUND(otherSalesPercentage,2) as otherSalesPercentage,ROUND(calcGM40Percentage,2) as calcGM40Percentage,actualGM,ROUND(actualGMPercentage,2) as actualGMPercentage,calculatedGM,ROUND(calculatedGMPercentage,2) as calculatedGMPercentage,ROUND(lcalcGM5Percentage,2) as lcalcGM5Percentage,ROUND(pcalcGM5Percentage,2) as pcalcGM5Percentage FROM ? order by item LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
            this.pdata = res;
		}
	}
	
	myFuncNext(){
		if(this.pageno < this.totpages)
		{
			this.pageno = this.pageno + 1;
			
			var res = alasql('SELECT month,totalSales,tobaccoSales,ROUND(tobaccoSalesPercentage,2) as tobaccoSalesPercentage,ROUND(calcGM25Percentage,2) as calcGM25Percentage,cigSales,ROUND(cigSalesPercentage,2) as cigSalesPercentage,ROUND(calcGM10Percentage,2) as calcGM10Percentage,lottoSales,ROUND(lottoSalesPercentage,2) as lottoSalesPercentage,prepaidSales,ROUND(prepaidSalesPercentage,2) as prepaidSalesPercentage,otherSales,ROUND(otherSalesPercentage,2) as otherSalesPercentage,ROUND(calcGM40Percentage,2) as calcGM40Percentage,actualGM,ROUND(actualGMPercentage,2) as actualGMPercentage,calculatedGM,ROUND(calculatedGMPercentage,2) as calculatedGMPercentage,ROUND(lcalcGM5Percentage,2) as lcalcGM5Percentage,ROUND(pcalcGM5Percentage,2) as pcalcGM5Percentage FROM ? order by item LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
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
			sheetid: 'GM Analysis Report',
			headers: true,
			caption: {
			  title:'GM Analysis Report',
			},
			column: {
			  style:'font-size:15px'
			},
			columns: [
			  {columnid:'month'},
			  {columnid:'totalSales'},
			  {columnid:'tobaccoSales'},			  
			  {columnid:'tobaccoSalesPercentage'},			  
			  {columnid:'calcGM25Percentage'},			  
			  {columnid:'cigSales'},			  
			  {columnid:'calcGM10Percentage'},
        {columnid:'lottoSales'},
        {columnid:'lottoSalesPercentage'},
        {columnid:'prepaidSales'},
        {columnid:'prepaidSalesPercentage'},
        {columnid:'otherSales'},
        {columnid:'otherSalesPercentage'},
        {columnid:'calcGM40Percentage'},
        {columnid:'actualGM'},
        {columnid:'actualGMPercentage'},
        {columnid:'calculatedGM'},
        {columnid:'calculatedGMPercentage'},
        {columnid:'lcalcGM5Percentage'},
        {columnid:'pcalcGM5Percentage'},
			]
		};
		alasql('SELECT * INTO XLS("GM_Analysis_Reports.xls",?) FROM ?',[mystyle,this.alldata]);
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
		var res = alasql('SELECT month,totalSales,tobaccoSales,ROUND(tobaccoSalesPercentage,2) as tobaccoSalesPercentage,ROUND(calcGM25Percentage,2) as calcGM25Percentage,cigSales,ROUND(cigSalesPercentage,2) as cigSalesPercentage,ROUND(calcGM10Percentage,2) as calcGM10Percentage,lottoSales,ROUND(lottoSalesPercentage,2) as lottoSalesPercentage,prepaidSales,ROUND(prepaidSalesPercentage,2) as prepaidSalesPercentage,otherSales,ROUND(otherSalesPercentage,2) as otherSalesPercentage,ROUND(calcGM40Percentage,2) as calcGM40Percentage,actualGM,ROUND(actualGMPercentage,2) as actualGMPercentage,calculatedGM,ROUND(calculatedGMPercentage,2) as calculatedGMPercentage,ROUND(lcalcGM5Percentage,2) as lcalcGM5Percentage,ROUND(pcalcGM5Percentage,2) as pcalcGM5Percentage FROM ? order by '+colname+' '+this.orderby+' LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
        this.pdata = res;
	}
}
