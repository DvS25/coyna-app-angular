import { LiveAnnouncer } from '@angular/cdk/a11y';
import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {CompanyService, UtilityHelper} from "../../shared";
import { DOCUMENT } from '@angular/common';


export interface PeriodicElement {
    sno: string;
    w1: string;
    w2: string;
    w3: string;
    w4: string;
    w5: string;
}

/**
 * @title Table with pagination
 */
@Component({
    selector: 'app-operationl',
    templateUrl: './operation-listing.component.html',
    styleUrls: ['./operation-listing.component.scss']
})
export class OperationlComponent {
	showPage:boolean = true;
    displayedColumns: string[] = ['sno', 'w1', 'w2', 'w3', 'w4', 'w5'];
    dataSource = new MatTableDataSource<PeriodicElement>();
    companyList: any;
    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private companyService: CompanyService,
		private utility: UtilityHelper,
        @Inject(DOCUMENT) document: Document
    ) {
        this.getCompanies();
        this.getOperation()
    }

    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
	
	ngOnInit(): void {
		if (!this.utility.chkPagePermission('Operation'))
		{
			this.showPage = false;
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
    getCompanies() {
        this.companyService.getCompany().subscribe(res => {
            if (res.code == "1") {
                this.companyList = res.results;
            }
        })
    }

    getOperation() {
        this.companyService.getOperation('INSTORE_OPERATION', 1, 30)
            .subscribe(res=> {
                this.dataSource.data = res.results
            })
    }
    selectCompanyId(val: any){
        if (val.value == "") {
            this.reset()
            return
        }
        this.companyService.getOperationSearch(val.value, 1, 30).subscribe(res=>{
            this.dataSource.data = res.results;
        })
    }

    reset(target?: any) {
        if (target == undefined) {
            // @ts-ignore
            document.getElementById("selectOperation").value= ''
            this.getOperation()
            return;
        }
        if (target.value.length == 0){
            this.getOperation()
            return;
        }
    }
}
