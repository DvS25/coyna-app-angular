import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { CompanyService, UtilityHelper } from 'src/app/shared';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { FilterService } from 'src/app/shared/service/filter/filter.service';



export interface PeriodicElement {
    sno: string;
    products: string;
    pos1: string;
    pos2: string;
    pos3: string;
}
/**
 * @title Table with pagination
 */
@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss']
})
export class CompanylComponent {
    showPage: boolean = true;
    displayedColumns: string[] = ['name', 'companyType', 'city', 'country', 'pos3'];
    companyName: string = '';
    dataSource = new MatTableDataSource<PeriodicElement>;

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private companyService: CompanyService,
        private toastr: ToastrService,
        private router: Router,
        private filterService: FilterService,
        private utility: UtilityHelper
    ) {
    }

    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit() {
        if (!this.utility.chkPagePermission('CompanyManagement')) {
            this.showPage = false;
        }
        const filterValues = this.filterService.getFilterValues('company');
        if (filterValues) {
            this.companyName = filterValues.value1;
            this.companySearch()
        }
        else {
            this.getCompanies()
        }
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    getCompanies() {
        this.companyService.getCompany().subscribe(res => {
            console.log(res);
            if (res.code == "1") {
                this.dataSource.data = res.results;
            }
        })
    }


    companySearch() {
        if (!this.companyName) {
            this.toastr.info('Please enter the company name ');
            return
        }
        this.filterService.setFilterValues('company', this.companyName, '', '');
        this.companyService.searchCompany(this.companyName, 1, 10).subscribe(res => {
            if (res.code == "1") {
                console.log(res.results)
                this.dataSource.data = res.results;
            }
        })
    }

    goTo(id: any) {
        this.router.navigate(['company-detail', id])
    }

    reset(target?: any) {
        if (target == undefined) {
            this.companyName = '';
            this.getCompanies()
            return;
        }
        if (target.value.length == 0) {
            this.getCompanies()
            return;
        }
    }

}
