import { LiveAnnouncer } from "@angular/cdk/a11y";
import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import {
  BrowserDB,
  ChartOfAccountSetupService,
  CompanyService,
  InvoiceManagementService,
  UtilityHelper
} from "../../../shared";
import { Router } from "@angular/router";
import { SelectionModel } from "@angular/cdk/collections";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { AdminComponent } from "src/app/layouts/admin/admin.component";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTabsModule } from "@angular/material/tabs";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";

/**
 * @title Table with pagination
 */

@Component({
  selector: "app-get-invoice",
  templateUrl: "./get-invoice.component.html",
  styleUrls: ["./get-invoice.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatExpansionModule,
    MatTabsModule,
    MatCardModule,
    MatDatepickerModule,
    CommonModule
  ]
})
export class GetInvoiceComponent {
  panelOpenState = false;
  invoices: any;
  displayedColumns: string[] = [
    "customers",
    "invoice_date",
    "type",
    "due_date",
    "invoice_amt",
    "bal_receivable",
    "aging",
    "status",
    "action"
  ];

  constructor(
    private invoiceManagementService: InvoiceManagementService,
    private AdminComponent: AdminComponent,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.AdminComponent.SetTitle("Invoices");
    this.getInvoices();
  }

  getInvoices() {
    this.invoiceManagementService.getInvoice().subscribe((res) => {
      if (res.code == "1") {
        this.invoices = res.results;
      }
    });
  }

  addInvoice() {
    this.router.navigate(["/add-invoice"]);
  }
}
