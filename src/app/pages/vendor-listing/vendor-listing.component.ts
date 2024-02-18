import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CompanyService, UtilityHelper} from "../../shared";
import {Router} from "@angular/router";


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
    selector: 'app-vendorl',
    templateUrl: './vendor-listing.component.html',
    styleUrls: ['./vendor-listing.component.scss']
})
export class VendorListingComponent {
	showPage:boolean = true;
    displayedColumns: string[] = ['sno', 'w1', 'w2', 'w4'];

    // @ts-ignore
    vendorFilterForm: FormGroup
    dataSource = new MatTableDataSource;
    companyList: any;
    storeList: any;
    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private companyService: CompanyService,
        private router: Router,
		private utility: UtilityHelper
    ) {
        this.vendorFormInit();
        this.getCompanyies();
        this.getVendorList();
    }

    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;



    ngOnInit(): void {
		if (!this.utility.chkPagePermission('VendorManagement'))
		{
			this.showPage = false;
		}
        this.dataSource = new MatTableDataSource(); // create new object
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
	
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    vendorFormInit() {
        this.vendorFilterForm = this.formBuilder.group({
            store_id: [''],
            company_id: ['']
        })
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

    vendorSearch() {
        const isEmpty = Object.values(this.vendorFilterForm.value).every(x => x === null || x === '');
        if (isEmpty) {
            this.toastr.info('Please select at least one filter')
        }
        if (this.vendorFilterForm.valid) {
            this.getVendorList();
        }
    }
    getCompanyies() {
        this.companyService.getCompany()
            .subscribe(res=> {
                if (res.code == '1'){
                    this.companyList = res.results
                }
            })
    }

    getStores(val?: any) {
        // @ts-ignore
        this.companyService.getStore(val.value)
            .subscribe(res=> {
                if (res.code == '1'){
                    this.storeList = res.results
                }
            })
    }

    getVendorList() {
        this.companyService.filterVendor(this.vendorFilterForm.value, 1,10).subscribe(res=> {
            if (res.code == '1'){
                this.dataSource.data = res.results;
            }
        })
    }

    goToVendorDetails(id: string) {
        this.router.navigate(['vendor-details', id])
    }


    reset(target?: any) {
        if (target == undefined) {
            this.vendorFilterForm.reset()
            this.getVendorList()
            return;
        }
    }
}
