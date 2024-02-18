import { Component } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { MatDialog } from "@angular/material/dialog";
import { ChartOfAccountSetupService } from "src/app/shared";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "src/app/layouts/admin/admin.component";
import { MatCardModule } from "@angular/material/card";
import { AddCustomerComponent } from "../add-customer/add-customer.component";
import { CustomerService } from "src/app/shared/service/apis/customer.service";

@Component({
  selector: "app-print-customer",
  templateUrl: "./print-customer.component.html",
  styleUrls: ["./print-customer.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    CommonModule
  ]
})
export class PrintCustomerComponent {
  customers: any;

  displayedColumns: string[] = [
    "customerName",
    "name",
    "address",
    "phoneNo",
    "email",
    "balance"
  ];

  constructor(
    private dialog: MatDialog,
    private customerService: CustomerService,
    private adminComponent: AdminComponent
  ) {}

  ngOnInit() {
    this.adminComponent.SetTitle("Print Customer List");
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((res) => {
      if (res.code == "1") {
        this.customers = res.results;
      }
    });
  }

  addOrEditCustomer(isEdit: boolean, customer?: any): void {
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      data: { isEdit: isEdit, customer: customer },
      width: "950px"
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getCustomers();
    });
  }
}
