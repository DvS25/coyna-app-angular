import {FormGroup, FormBuilder, FormControl, FormArray, Validators, AbstractControl} from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {CompanyService, UtilityHelper} from "../../shared";


export interface PeriodicElement {
    sno: string;
    w1: string;
    w2: string;
    w3: string;
    w4: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {sno: 'Company Name', w1: 'Store Name', w2: '14424234', w3: 'Fullname', w4: 'abc@gmail.com'},
    {sno: 'Company Name', w1: 'Store Name', w2: '14424234', w3: 'Fullname', w4: 'abc@gmail.com'},
    {sno: 'Company Name', w1: 'Store Name', w2: '14424234', w3: 'Fullname', w4: 'abc@gmail.com'},
    {sno: 'Company Name', w1: 'Store Name', w2: '14424234', w3: 'Fullname', w4: 'abc@gmail.com'},
    {sno: 'Company Name', w1: 'Store Name', w2: '14424234', w3: 'Fullname', w4: 'abc@gmail.com'},
    {sno: 'Company Name', w1: 'Store Name', w2: '14424234', w3: 'Fullname', w4: 'abc@gmail.com'},
    {sno: 'Company Name', w1: 'Store Name', w2: '14424234', w3: 'Fullname', w4: 'abc@gmail.com'},

];

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-store1',
  templateUrl: './finance-listing.component.html',
  styleUrls: ['./finance-listing.component.scss']
})
export class AFinanceComponent {
	showPage:boolean = true;
	userTypeList: any = [];
    displayedColumns: string[] = ['sno', 'w1', 'w2', 'w3', 'w4', 'w5'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    companyList: any;
    constructor(
		private formBuilder: FormBuilder,
        private _liveAnnouncer: LiveAnnouncer,
        private companyService: CompanyService,
		private utility: UtilityHelper
    ) {
        this.getCompanies()
        this.filterSearch()
    }
	
	filterSearchForm = this.formBuilder.group({
        selectFinanace: [''],
        selectUserType: [''],
    })

    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
	
	ngOnInit(): void {
		if (!this.utility.chkPagePermission('Finance'))
		{
			this.showPage = false;
		}
    }
	
    getCompanies() {
        this.companyService.getCompany().subscribe(res => {
            if (res.code == "1") {
                this.companyList = res.results;
				this.getUserTypes();
            }
        })
    }
	
	getUserTypes() {
        this.companyService.getUserTypeList().subscribe(res => {
            if (res.code == '1') {
                this.userTypeList = res.results;
            }
        })
    }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    getOperation() {
        /*this.companyService.getOperation('FINANCE', 1, 50)
            .subscribe(res=> {
                this.dataSource.data = res.results
            })*/
    }
	
    selectCompanyId(val: any){
        /*this.companyService.getOperationSearch(val.value, 1, 50).subscribe(
            res=>
            this.dataSource.data = res.results
        )*/
		this.filterSearch();
    }
	
    changeUserType(val: any){
        this.filterSearch();
    }
	
    filterSearch(){
        this.companyService.getUsers(this.filterSearchForm.value.selectFinanace, this.filterSearchForm.value.selectUserType, 1, 50).subscribe(
            res=>
            this.dataSource.data = res.results
        )
    }

    reset() {
		this.filterSearchForm.controls.selectFinanace.setValue('');
		this.filterSearchForm.controls.selectUserType.setValue('');
        this.filterSearch();
    }
}

