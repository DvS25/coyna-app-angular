import { Component } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { MatDialog } from "@angular/material/dialog";
import { ChartOfAccountSetupService } from "src/app/shared";
import { CommonModule } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { AdminComponent } from "src/app/layouts/admin/admin.component";

@Component({
  selector: "app-get-expense-income-registers",
  templateUrl: "./get-expense-income-registers.component.html",
  styleUrls: ["./get-expense-income-registers.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    CommonModule,
    MatCardModule,
    MatDatepickerModule
  ]
})
export class GetExpenseIncomeRegistersComponent {
  chartOfAccounts: any;

  displayedColumns: string[] = [
    "date",
    "accountName",
    "transactionNumber",
    "description",
    "amount",
    "department",
    "action"
  ];

  constructor(
    private dialog: MatDialog,
    private chartOfAccountSetupService: ChartOfAccountSetupService,
    private notification: ToastrService,
    private adminComponent: AdminComponent
  ) {}

  ngOnInit() {
    this.adminComponent.SetTitle('Expense & Income registers');
    this.getChartOfAccounts();
  }

  getChartOfAccounts() {
    this.chartOfAccountSetupService.getChartOfAccount().subscribe((res) => {
      if (res.code == "1") {
        this.chartOfAccounts = res.results;
      }
    });
  }

  addOrEditCoa(isEdit: boolean, chartOfAccount?: any): void {}

  deleteChartOfAccount(chartOfAccount?: any): void {
    this.chartOfAccountSetupService
      .deleteChartOfAccount(chartOfAccount?.id)
      .subscribe((res) => {
        if (res.code === "1") {
          this.notification.success(res.message);
          this.getChartOfAccounts();
        }
      });
  }
}
