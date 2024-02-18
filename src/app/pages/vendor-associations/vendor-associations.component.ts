import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, FormArray, Validators, AbstractControl} from '@angular/forms';
import {BrowserDB, CompanyService, Constants, InvoiceManagementService, blobFileDownload, unquieArray, UtilityHelper} from "../../shared";
import { ToastrService } from 'ngx-toastr';
import alasql from 'alasql';

@Component({
  selector: 'app-vendor-associations',
  templateUrl: './vendor-associations.component.html',
  styleUrls: ['./vendor-associations.component.scss']
})

export class VendorAssociationsComponent {
	vendorAssociationForm: FormGroup = new FormGroup({});
	showPage:boolean = true;
	companyList: any;
    storeList: any = [];
    allstoreList: any = [];
    vendorLists: any = [];
    pageLists: any = [];
    pageListsFinal: any = [];
	companyNameMap:any = {};
	storeNameMap:any={};
	
	filterSearchForm = this.formBuilder.group({
        companyId: ['', Validators.required],
        storeId: ['', Validators.required],
        vendorId: ['', Validators.required]
    })
	
	constructor(
        private browserDB: BrowserDB,
        private constants: Constants,
        private formBuilder: FormBuilder,
        private companyService: CompanyService,
		private toastr: ToastrService,
		private utility: UtilityHelper
    ) {
        this.getCompanies();
		this.getAllStores();
		this.buildForm();
    }
	
	buildForm() {        
        this.vendorAssociationForm = this.formBuilder.group({
            va_rows: this.formBuilder.array([])
        });
    }
	
	get va_rows(): FormArray {
        return this.vendorAssociationForm.get('va_rows') as FormArray;
    }
	
	ngOnInit() {    
		if (!this.utility.chkPagePermission('VendorManagement'))
		{
			this.showPage = false;
		}
		
		this.initAttachments()
		this.filterSearch()
	}
	
	initAttachments(){
		let newVARow = this.formBuilder.group({
			va_companyId: new FormControl(''),
			va_storeId: new FormControl(''),
			va_vendorId: new FormControl('')
		});
		this.va_rows.push(newVARow);
	}

	getCompanies() {
        this.companyService.getCompany().subscribe(res => {
            if (res.code == '1') {
                this.companyList = res.results;
				this.getVendorLists();
				this.companyList.forEach((company:any) => {
					// @ts-ignore
					this.companyNameMap[company.companyId] = company.name;
				  });
            }
        })
    }
	
	getVendorLists() {
        this.companyService.getVendor().subscribe(res =>{
			if (res.code == '1') {
				this.vendorLists = res.results;
			}
		})
    }
	
	getStores(val: any) {
        console.log(val)
		this.storeList = [];
		if(val.value == "")
		{
			return;	
		}
        this.companyService.getStore(val.value).subscribe(res => {
            if (res.code == '1') {
                this.storeList = res.results;
            }
        })
    }
	getAllStores() {
        this.companyService.getAllStores().subscribe(res => {
            if (res.code == '1') {
               
				res.results.forEach((store:any) => {
					// @ts-ignore
					this.storeNameMap[store.companyId] = store.name;
				  });
            }
        })
    }
	resetFilters(){
		this.filterSearchForm.get('companyId')?.setValue('')
		this.filterSearchForm.get('storeId')?.setValue('')
		this.filterSearchForm.get('vendorId')?.setValue('')
		this.filterSearch()
        return;
	}
	
	filterSearch()
	{
		console.log(this.companyNameMap)
		this.pageLists = [];
		this.companyService.getVendor().subscribe(res =>{
			if (res.code == '1') {
				var vendors = res.results;
				var finalobj = [];
				for(var i = 0 ; i < vendors.length ; i++)
				{
					var tmplists = vendors[i].companyVendorModelList;
					if(tmplists!=null)
					{
					for(var j = 0 ; j < tmplists.length ; j++)
					{
						let companyPos = false;
						let storePos = false;
						let vendorPos = false;
						if(this.filterSearchForm.value.companyId != "")
						{
							if(this.filterSearchForm.value.companyId == tmplists[j].companyId)
							{
								companyPos = true;
							}
						}
						else
						{
							companyPos = true;
						}
						if(this.filterSearchForm.value.storeId != "")
						{
							if(this.filterSearchForm.value.storeId == tmplists[j].storeId)
							{
								storePos = true;
							}
						}
						else
						{
							storePos = true;
						}
						if(this.filterSearchForm.value.vendorId != "")
						{
							if(this.filterSearchForm.value.vendorId == tmplists[j].vendorId)
							{
								vendorPos = true;
							}
						}
						else
						{
							vendorPos = true;
						}
						
						if(companyPos == true && storePos == true && vendorPos == true)
						{
							var cri = {"companyVendorId" : tmplists[j].companyVendorId, "companyId" : tmplists[j].companyId, "storeId" : tmplists[j].storeId, "vendorId" : tmplists[j].vendorId, "vendorName" : vendors[i].name};
							finalobj.push(cri);	
						}
						
						this.pageLists = finalobj;
					}
				}
				}
			}
		})
	}
	
	deleteVendorAssociationRow(index: number) {
		this.va_rows.removeAt(index);
	}
	deleteVendorAssociation(id:string){
		this.companyService.deleteVendorAssociation(id).subscribe(res=>{
			if(res.code==='1')
			{
				this.toastr.success("Association removed succesfully")
			}
		})
	}
	
	addVendorAssociationRow() {
		const newVARow = this.formBuilder.group({
			va_companyId: new FormControl(""),
			va_storeId: new FormControl(""),
			va_vendorId: new FormControl("")
		});
		this.va_rows.push(newVARow);
	}
	
	onVAValueChange(txtval: any, index: number, from_ctrl: any) {
        const VAControl = this.va_rows.at(index).get(from_ctrl);
        if (VAControl) {
            VAControl.setValue(txtval.target.value);
        }
		console.log(this.va_rows);
    }
	
	saveVendorAssociationRow(){
		/*------------------------------------------------------------*/
		console.log("Validation Start");		
		
		var va_anyonedata = false;
		var va_alldatafound = true;
		for(var i = 0; i< this.va_rows.length; i++)
		{
			va_anyonedata = true;
			if(this.va_rows.at(i).value.va_companyId == '' || this.va_rows.at(i).value.va_storeId == '' || this.va_rows.at(i).value.va_vendorId == '')
			{
				va_alldatafound = false;
			}
		}
		
		if(va_anyonedata == false)
		{
			this.toastr.error("Please Add Atleast One Record.");
			return;
		}		
		if(va_alldatafound == false)
		{
			this.toastr.error("Please Select All Datas.");
            return;
		}		
		
		var sameRow = false;
		for(var i = 0; i < this.va_rows.length; i++)
		{
			for(var j = 0; j < this.va_rows.length; j++)
			{
				if(i != j)
				{
					if(this.va_rows.at(i).value.va_companyId == this.va_rows.at(j).value.va_companyId && 
						this.va_rows.at(i).value.va_storeId == this.va_rows.at(j).value.va_storeId && 
						this.va_rows.at(i).value.va_vendorId == this.va_rows.at(j).value.va_vendorId)
					{
						sameRow = true;
						break;
					}
				}
				
			}
		}
		
		if(sameRow == true)
		{
			this.toastr.error("Please Select Different Combination Records in Diff Rows.");
            return;
		}
		
		var isDataAddedAlready = false;var foundslno = 0;
		var finalObj = [];
		for(var i = 0; i < this.va_rows.length; i++)
		{
			var cri = {
				"companyId" : this.va_rows.at(i).value.va_companyId,
				"storeId" : this.va_rows.at(i).value.va_storeId,
				"vendorId" : this.va_rows.at(i).value.va_vendorId
			};
			finalObj.push(cri);
			var tmpdata = alasql('SELECT companyId,storeId,vendorId FROM ? where companyId=? and storeId = ? and vendorId = ?',[this.pageLists,this.va_rows.at(i).value.va_companyId, this.va_rows.at(i).value.va_storeId, this.va_rows.at(i).value.va_vendorId]);
            if(tmpdata.length > 0)
			{
				foundslno = (i+1);
				isDataAddedAlready = true;
				break;
			}			
		}
		
		if(isDataAddedAlready == true)
		{
			this.toastr.error("Row No "+foundslno+" Data Already Exists.");
            return;
		}
				
		console.log("Validation end");
		/*------------------------------------------------------------*/
		this.companyService.addCompanyVendorAssociation(finalObj).subscribe(res=>{
			if(res.code==='1')
			{
				this.toastr.success("Association added successfully")
			}
		})
		console.log("finalObj", finalObj);
	}
}
