import { Component } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { AddChartOfAccountSetupComponent } from "../add-chart-of-account-setup/add-chart-of-account-setup.component";
import { MatDialog } from "@angular/material/dialog";
import { ChartOfAccountSetupService } from "src/app/shared";
import { CommonModule } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import {Router} from "@angular/router";
import { AdminComponent } from "src/app/layouts/admin/admin.component";

@Component({
  selector: "app-chart-of-account-setup",
  templateUrl: "./get-chart-of-account-setup.component.html",
  styleUrls: ["./get-chart-of-account-setup.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    CommonModule
  ]
})
export class GetChartOfAccountSetupComponent {
  chartOfAccounts: any;

  displayedColumns: string[] = ["accountName", "type", "detailType", "action"];

  constructor(
    private dialog: MatDialog,
    private chartOfAccountSetupService: ChartOfAccountSetupService,
    private notification: ToastrService,
    private router: Router,
    private adminComponent: AdminComponent,
  ) {}

  ngOnInit() {
    this.adminComponent.SetTitle('Chart Of Accounts Setup');
    this.getChartOfAccounts();
  }

  getChartOfAccounts() {
    this.chartOfAccountSetupService.getChartOfAccount().subscribe((res) => {
      if (res.code == "1") {
        this.chartOfAccounts = res.results;
      }
    });
  }

  addOrEditCoa(isEdit: boolean, chartOfAccount?: any): void {
    const dialogRef = this.dialog.open(AddChartOfAccountSetupComponent, {
      data: { isEdit: isEdit, id: chartOfAccount?.id },
      width: "950px"
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getChartOfAccounts();
    });
  }

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

  register(): void {
    this.router.navigate(['/coa-report'])
  }
}
