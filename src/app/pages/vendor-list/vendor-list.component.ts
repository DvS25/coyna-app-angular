import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { BrowserDB, CompanyService, UtilityHelper } from "../../shared";
import { Router } from "@angular/router";
import { SelectionModel } from '@angular/cdk/collections';
import { AdminComponent } from 'src/app/layouts/admin/admin.component';
import { CustomerService } from 'src/app/shared/service/apis/customer.service';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';
import { MatDialog } from '@angular/material/dialog';
import { VendorExpenseService } from 'src/app/shared/service/apis/vendor-expense.service';

/**
 * @title Table with pagination
 */

export interface PeriodicElement {
  name: string;
  phoneNumber: string;
  email: string;
  unpaidBalance: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: "Brooklyn", phoneNumber: "(808) 550-111", email: "brooklyn@gmail.com", unpaidBalance: "$472.00" },
  { name: "Albert", phoneNumber: "(505) 555-0125", email: "albert@gmail.com", unpaidBalance: "$779.00" },
  { name: "Darell", phoneNumber: "(219) 555-114", email: "darell@gmail.com", unpaidBalance: "$354.00" },
  { name: "Devon Lane", phoneNumber: "(319) 555-0115", email: "devonlane@gmail.com", unpaidBalance: "$412.00" },
  { name: "Ariene", phoneNumber: "(208) 555-112", email: "ariene@gmail.com", unpaidBalance: "$112.00" },
  { name: "McCoy", phoneNumber: "(207) 555-112", email: "ariene@gmail.com", unpaidBalance: "$112.00" },

];
@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent {
  displayedColumns: string[] = ['select', 'name', 'phoneNumber', 'email', 'unpaidBalance', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  customers: any;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  VendorList: any = [
    { name: "Brooklyn", phoneNumber: "(808) 550-111", email: "brooklyn@gmail.com", unpaidBalance: "$472.00" },
    { name: "Albert", phoneNumber: "(505) 555-0125", email: "albert@gmail.com", unpaidBalance: "$779.00" },
    { name: "Darell", phoneNumber: "(219) 555-114", email: "darell@gmail.com", unpaidBalance: "$354.00" },
    { name: "Devon Lane", phoneNumber: "(319) 555-0115", email: "devonlane@gmail.com", unpaidBalance: "$412.00" },
    { name: "Ariene", phoneNumber: "(208) 555-112", email: "ariene@gmail.com", unpaidBalance: "$112.00" },
    { name: "McCoy", phoneNumber: "(207) 555-112", email: "ariene@gmail.com", unpaidBalance: "$112.00" },
    { name: "Albert", phoneNumber: "(505) 555-0125", email: "albert@gmail.com", unpaidBalance: "$779.00" },
    { name: "Devon Lane", phoneNumber: "(319) 555-0115", email: "devonlane@gmail.com", unpaidBalance: "$412.00" },
    { name: "Brooklyn", phoneNumber: "(808) 550-111", email: "brooklyn@gmail.com", unpaidBalance: "$472.00" },
    { name: "Ariene", phoneNumber: "(208) 555-112", email: "ariene@gmail.com", unpaidBalance: "$112.00" },

  ];

  ExpenseForm = this.formBuilder.group({
    vendor: ['', Validators.required],
    payment_account: ['', Validators.required],
    reference_number: ['', Validators.required],
    payment_date: ['', Validators.required],
    payment_method: ['', Validators.required],
  })

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private companyService: CompanyService,
    private router: Router,
    private AdminComponent: AdminComponent,
    private browser: BrowserDB,
    private dialog: MatDialog,
    private customerService: CustomerService,
    private vendorService : VendorExpenseService
  ) { }

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  dataSource1 : any[] = [];

  ngOnInit(): void {
    this.AdminComponent.SetTitle('Vendor List');
    this.getCustomers();
    this.getvendor();
  }
  public getvendor() {
    this.vendorService.getVendorList().subscribe((data) => {
      this.dataSource1 = data.results;
    });
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe((res) => {
      if (res.code == "1") {
        this.customers = res.results;
      }
    });
  }

  async addOrEditVendor(isEdit: boolean, customer?: any) {
    // if (isEdit) {
    //   const temp = await this.companyService.getVendorDetails(customer.vendorId).toPromise();
    //   console.log("temp = ", temp);
    // }
    const dialogRef = this.dialog.open(AddVendorComponent, {
      data: { isEdit: isEdit, customer: customer },
      width: "950px"
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getCustomers();
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
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

  moveTo() {
    this.router.navigate(["bills"], { queryParams: { type: "paid" } })
  }


}
