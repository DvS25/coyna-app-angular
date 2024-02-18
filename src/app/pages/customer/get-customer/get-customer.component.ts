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
import { Router } from "@angular/router";

@Component({
  selector: "app-get-customer",
  templateUrl: "./get-customer.component.html",
  styleUrls: ["./get-customer.component.scss"],
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
export class GetCustomerComponent {
  customers: any;

  displayedColumns: string[] = [
    "name",
    "phoneNo",
    "email",
    "unpaidBalance",
    "action"
  ];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private customerService: CustomerService,
    private adminComponent: AdminComponent
  ) {}

  ngOnInit() {
    this.adminComponent.SetTitle("Customers");
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

  printCustomers(): void {
    this.router.navigate(["/print-customer"]);
  }
}
