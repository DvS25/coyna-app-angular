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
  selector: 'app-fuel-dip-report',
  templateUrl: './fuel-dip-report.component.html',
  styleUrls: ['./fuel-dip-report.component.scss']
})
export class FuelDipReportComponent {
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
	itemList: any;
	firstItemId: any;

  constructor(
		private formBuilder: FormBuilder,
        private companyService: CompanyService,
		private utility: UtilityHelper
        ) {
		this.getCompanies();
    
    }

    myGroup: FormGroup = this.formBuilder.group(
      {
        fin_year: [''],
		parentCompanyId:[''],
        storeId: [''],
        date: [''],
        itemId: [''],
		month: [''],
		
      },
    );

	ngOnInit(): void{
		if (!this.utility.chkPagePermission('ManagementReports'))
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

  
	getStoreList(val: any) {
    this.companyService.getStore(val.value).subscribe(res => {
        if (res) {
            console.log('ssssss', res.results)
            this.storeList = res.results;
        }
    })
}

getItems () {
	this.companyService.getCategory("bb20ff3b-5c76-441f-8f87-a2ff39ce4e66").subscribe(res=> {
    if (res) {
      this.itemList =  res.results.itemModelList;
      if((this.itemList).length > 0)
      {
        this.firstItemId = (this.itemList)[0].name;
        //this.myGroup.controls['itemId'].setValue(this.firstItemId);
      }
      this.getReports();
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
		
    if(this.myGroup.value.itemId != '')
		{
			params = params + ",item-id";
			values = values + ","+this.myGroup.value.itemId;
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
		
        this.companyService.fetchReport('fueldip-report',params,values).subscribe(res => {
            if (res.code == "1") {
                this.alldata = res.results;
                this.data = res.results;

				this.totpages = Math.ceil(((res.results).length / this.limit));
				console.log(this.totpages);
				var res = alasql('SELECT date,openingPhysical,delivery,meterSales,inventoryOnHand,closingPhysical,variationOS,broughtForwardOS,adjustment,accumulatedOS,temperature FROM ? order by item LIMIT '+this.limit+' OFFSET 0',[this.alldata]);
                this.pdata = res;				
            }
        })
    }
	
    
	myFuncPrevious(){
		if(this.pageno > 1)
		{
			this.pageno = this.pageno - 1;
			
			var res = alasql('SELECT date,openingPhysical,delivery,meterSales,inventoryOnHand,closingPhysical,variationOS,broughtForwardOS,adjustment,accumulatedOS,temperature FROM ? order by item LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
            this.pdata = res;
		}
	}
	
	myFuncNext(){
		if(this.pageno < this.totpages)
		{
			this.pageno = this.pageno + 1;
			
			var res = alasql('SELECT date,openingPhysical,delivery,meterSales,inventoryOnHand,closingPhysical,variationOS,broughtForwardOS,adjustment,accumulatedOS,temperature FROM ? order by item LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
            this.pdata = res;
		}
	}
	
	myFuncReset(){
		this.myGroup.reset();
		this.myGroup.controls['fin_year'].setValue(2023);
		this.myGroup.controls['month'].setValue(12);
		this.getStoreList('');
		this.getCompanies();
		this.getReports();
		
	}
	
	myFuncApply(){
		this.getReports();
	}
	
	excelDownload(){
		var mystyle = {
			sheetid: 'Fuel Dip Report',
			headers: true,
			caption: {
			  title:'Fuel Dip Report',
			},
			column: {
			  style:'font-size:15px'
			},
			columns: [
			  {columnid:'date'},
			  {columnid:'openingPhysical'},
			  {columnid:'delivery'},			  
			  {columnid:'meterSales'},			  
			  {columnid:'inventoryOnHand'},			  
			  {columnid:'closingPhysical'},			  
			  {columnid:'variationOS'},
        {columnid:'broughtForwardOS'},
        {columnid:'adjustment'},
        {columnid:'accumulatedOS'},
        {columnid:'temperature'}
        
			]
		};
		alasql('SELECT * INTO XLS("Fuel_Dip_Reports.xls",?) FROM ?',[mystyle,this.alldata]);
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
		var res = alasql('SELECT date,openingPhysical,delivery,meterSales,inventoryOnHand,closingPhysical,variationOS,broughtForwardOS,adjustment,accumulatedOS,temperature FROM ? order by '+colname+' '+this.orderby+' LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
        this.pdata = res;
	}
}
