import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CompanyService, UtilityHelper} from "../../shared";
import {Router} from "@angular/router";
import { CustomerService } from 'src/app/shared/service/apis/customer.service';

export interface PeriodicElement {
    sno: string;
    w1: string;
    w2: string;
    w3: string;
    w4: string;
}
@Component({
  selector: 'app-customer-listing',
  templateUrl: './customer-listing.component.html',
  styleUrls: ['./customer-listing.component.scss']
})
export class CustomerListingComponent {
  showPage:boolean = true;
  displayedColumns: string[] = ['sno', 'w1', 'w2', 'w4'];
  // @ts-ignore
  customerFilterForm: FormGroup
  dataSource = new MatTableDataSource;
  companyList: any;
  storeList: any;
  constructor(
      private _liveAnnouncer: LiveAnnouncer,
      private formBuilder: FormBuilder,
      private toastr: ToastrService,
      private companyService: CompanyService,
      private customerService: CustomerService,
      private router: Router,
  private utility: UtilityHelper
  ) {
      this.customerFormInit();
      this.getCompanyies();
      this.getCustomerList();
  }

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;



  ngOnInit(): void {

      this.dataSource = new MatTableDataSource(); // create new object
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator.page.subscribe((pageEvent) => {
        console.log(pageEvent)
        const pageIndex = pageEvent.pageIndex + 1;
        const pageSize = pageEvent.pageSize;
        this.getCustomerList();
      });
  }

  customerFormInit() {
      this.customerFilterForm = this.formBuilder.group({
        company_id: [''],
        store_id: ['']
      })
  }

  announceSortChange(sortState: Sort) {
      if (sortState.direction) {
          this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
          this._liveAnnouncer.announce('Sorting cleared');
      }
  }

  customerSearch() {
      const isEmpty = Object.values(this.customerFilterForm.value).every(x => x === null || x === '');
      if (isEmpty) {
          this.toastr.info('Please select at least one filter')
      }
      if (this.customerFilterForm.valid) {
          this.getCustomerList();
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

  getCustomerList() {
      this.customerService.getCustomers().subscribe(res=> {
          if (res.code == '1'){
            console.log(res.results)
              this.dataSource.data = res.results;
          }
      })
  }

  goToCustomerDetail(id: string) {
      this.router.navigate(['customer-detail', id])
  }


  reset(target?: any) {
      if (target == undefined) {
          this.customerFilterForm.get('store_id')?.setValue('')
          this.customerFilterForm.get('company_id')?.setValue('')
          this.getCustomerList()
          return;
      }
  }
}
