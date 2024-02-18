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
  selector: 'app-revenue-and-gst-return',
  templateUrl: './revenue-and-gst-return.component.html',
  styleUrls: ['./revenue-and-gst-return.component.scss']
})

export class RevenueAndGstReturnComponent {
	showPage:boolean = true;
	companyList: any =[];
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
	myGroup: FormGroup;
	
	constructor(
		private companyService: CompanyService,
		private formBuilder: FormBuilder,
		private utility: UtilityHelper,
		private toastr: ToastrService
	) {
		
		this.myGroup = this.formBuilder.group(
			{
				fin_year: ['2023'],
				parentCompanyId:  [],
			},
		);				
	}	

	ngOnInit(): void{
		if (!this.utility.chkPagePermission('ManagementReports'))
		{
			this.showPage = false;
		}
		this.getCompanies();
	}
	

	getCompanies () {
		console.log("1");
		return this.companyService.getCompany().subscribe(res=> {
			if (res) {
				this.companyList =  res.results;		;
				this.myGroup.controls['parentCompanyId'].setValue(this.companyList[0].companyId);	
				this.getReports();			
			}
		})
	}

	getOrderedCol () {
		var keys = this.pdata && this.pdata[0] && Object.keys(this.pdata[0]) || [];
				var selectedCol = ['Description']
				for(var i=0;i<keys.length;i++) {
					if(keys[i] !== 'Description' && keys[i] !== 'Total') {
						selectedCol.push(keys[i]);
					}
				}
				selectedCol.push('Total')
			return selectedCol;
	}
	
	
	async getReports() {
		
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
		
		
		if(params != '')
		{
			params = params.substr(1);
			values = values.substr(1);
		}
		
        this.companyService.fetchReport('revenuegst-report',params,values).subscribe(res => {
            if (res.code == "1") {
                this.alldata = res.results;
                this.data = res.results;				
				this.totpages = Math.ceil(((res.results).length / this.limit));
				console.log(this.alldata);
				var res = alasql('SELECT * FROM ? order by description LIMIT '+this.limit+' OFFSET 0',[this.alldata]);
				this.pdata = res;
								
            }
        })
    }

	myFuncPrevious(){
		if(this.pageno > 1)
		{
			this.pageno = this.pageno - 1;
			
			var res = alasql('SELECT * FROM ? order by date description '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
            this.pdata = res;
		}
	}
	
	myFuncNext(){
		if(this.pageno < this.totpages)
		{
			this.pageno = this.pageno + 1;
			
			var res = alasql('SELECT * FROM ? order by date description '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
            this.pdata = res;
		}
	}
	
	myFuncReset(){
		this.myGroup.reset();
		this.myGroup.controls['fin_year'].setValue(2023);
		this.myGroup.controls['parentCompanyId'].setValue(this.companyList[0].companyId);
		this.getReports();
	}
	
	myFuncApply(){
		this.getReports();
	}

	getExcelColumns() {
		/*const firstObject = this.pdata[0];
		const values: any[] = [];
		for (const key in firstObject) {
			if (firstObject.hasOwnProperty(key)) {
				values.push({
					columnid: key
				});
			}
		}*/
		//return values;
		var keys = this.pdata && this.pdata[0] && Object.keys(this.pdata[0]) || [];
		const values: any[] = [];
				values.push({columnid:'Description' });
				for(var i=0;i<keys.length;i++) {
					if(keys[i] !== 'Description' && keys[i] !== 'Total') {
						
						values.push({columnid:keys[i] });
					}
				}				
				values.push({
					columnid: 'Total'
				});
				return values;
	}

	excelDownload(){
		var mystyle = {
			sheetid: 'Revenue & GST Return Report',
			headers: true,
			caption: {
			  title:'Revenue & GST Return Report',
			},
			column: {
			  style:'font-size:15px'
			},
			columns: this.getExcelColumns()
		};
		alasql('SELECT * INTO XLS("Revenus_&_GST_Return.xls",?) FROM ?',[mystyle,this.alldata]);
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
		
		this.lastsortcolumn = colname;
		this.pageno = 1;
		var tmpcol = colname;
		if(tmpcol == 'total')
		{
			tmpcol = 'totalval';
		}
		var res = alasql('SELECT * FROM ? order by '+tmpcol+' '+this.orderby+' LIMIT '+this.limit+' OFFSET '+((this.pageno - 1) * this.limit)+'',[this.alldata]);
        this.pdata = res;
	}
}