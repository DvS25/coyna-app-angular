import { LiveAnnouncer } from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {CompanyService, UtilityHelper} from "../../shared";
import {Router} from "@angular/router";
import { FilterService } from 'src/app/shared/service/filter/filter.service';


export interface PeriodicElement {
    sno: string;
    w1: string;
    w2: string;
    w3: string;
    w4: string;
}
/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-store',
  templateUrl: './store-management.component.html',
  styleUrls: ['./store-management.component.scss']
})
export class StoremgntComponent {
	showPage:boolean = true;
   displayedColumns: string[] = ['sno', 'w1', 'w2', 'w3', 'w4'];
    dataSource = new MatTableDataSource<PeriodicElement>();
    storeName:string='';
    companyList: any;
    companyId: any;
    companyName: string='';
    cName:string=''
    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private companyService: CompanyService,
        private filterService :FilterService,
        private router: Router,
		private utility: UtilityHelper
		) {
            this.getCompanies()
    }

    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnInit(){
		if (!this.utility.chkPagePermission('StoreManagement'))
		{
			this.showPage = false;
		}
		
        const filters = this.filterService.getFilterValues('store-management')
        if(filters)
        {
            this.selectCompanyId({value:filters.value1})
            this.storeName = filters.value2
            this.filterStores()
     
        }
        else
        {
            this.getAllStores()
        }
    }


    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
        // This example uses English messages. If your application supports
        // multiple language, you would internationalize these strings.
        // Furthermore, you can customize the message to add additional
        // details about the values being sorted.
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }
    getAllStores(){
        this.companyService.getAllStores().subscribe(res=>{
            this.dataSource.data = res.results;
        })
    }

    getCompanies() {
        this.companyService.getCompany().subscribe(res => {
            if (res.code == "1") {
                this.companyList = res.results;
            }
        })
    }
    selectCompanyId(val: any){
        this.storeName=''
        if(val.value!='')
        {
        this.filterService.setFilterValues('store-management',val.value,'','')
        this.companyService.getStore(val.value).subscribe(res=>{
            this.dataSource.data = res.results;
        })
    }
    }
    filterStores(){
        this.companyName = ''
        this.filterService.setFilterValues('store-management','',this.storeName,'')
        if(this.storeName!='')
        {
            this.companyService.searchStores(this.storeName).subscribe(res=>{
                this.dataSource.data = res.results;
            })
        }
    }

    goTO(id: any){
        this.router.navigate(['store-details', id])
    }

    reset(target?: any) {
        if (target == undefined) {
            this.storeName = '';
            this.companyName='';
            this.getAllStores()
            return;
        }
        if (target.value.length == 0){
            this.getAllStores()
            return;
        }
    }
}
