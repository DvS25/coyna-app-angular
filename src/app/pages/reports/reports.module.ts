import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgingReportComponent } from './aging-report/aging-report.component';
import { DailyActivityReportComponent } from './daily-activity-report/daily-activity-report.component';
import { DebtorsListComponent } from './debtors-list/debtors-list.component';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { FuelDipReportComponent } from './fuel-dip-report/fuel-dip-report.component';
import { KnockoffSummaryComponent } from './knockoff-summary/knockoff-summary.component';
import { KnockoffDetailsComponent } from './knockoff-details/knockoff-details.component';
import { PayableAnalysisComponent } from './payable-analysis/payable-analysis.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GeneralLedgerComponent } from './general-ledger/general-ledger.component';
import { TrialBalanceComponent } from './trial-balance/trial-balance.component';
import { ChequesProcessedReportComponent } from './cheques-processed-report/cheques-processed-report.component';
import { DepartmentsWeeklyReportComponent } from './departments-weekly-report/departments-weekly-report.component';
import { CostMarginReportComponent } from './cost-margin-report/cost-margin-report.component';
import { ProfitLossAccountComponent } from './profit-loss-account/profit-loss-account.component';
import { MonthlyProfitLossAccountComponent } from './monthly-profit-loss-account/monthly-profit-loss-account.component';
import { SupplierStatementComponent } from './supplier-statement/supplier-statement.component';
import { PurchaseReportComponent } from './purchase-report/purchase-report.component';
import { MonthlyComparisonReportsComponent } from './monthly-comparison-reports/monthly-comparison-reports.component';
import { SalesAndCashReconciliationSheetComponent } from './sales-and-cash-reconciliation-sheet/sales-and-cash-reconciliation-sheet.component';
import { SalesPerformanceComponent } from './sales-performance/sales-performance.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { CashFlowManagementComponent } from './cash-flow-management/cash-flow-management.component';
import { GMAnalysisComponent } from './gmanalysis/gmanalysis.component';
import { TargetAndSalesComponent } from './target-and-sales/target-and-sales.component';
import { DailyActivityGComponent } from './daily-activity-report/daily-activity-g/daily-activity-g.component';
import { DailyActivityDComponent } from './daily-activity-report/daily-activity-d/daily-activity-d.component';
import { DailyActivityISComponent } from './daily-activity-report/daily-activity-is/daily-activity-is.component';
import { DailyActivityPComponent } from './daily-activity-report/daily-activity-p/daily-activity-p.component';
import { SalesDepartmentComponent } from './daily-activity-report/daily-activity-is/sales-department/sales-department.component';
import { DailyLotteryComponent } from './daily-lottery/daily-lottery.component';
import { RevenueAndGstReturnComponent } from './revenue-and-gst-return/revenue-and-gst-return.component';
import { RevenueAndGstReturnScreen2Component } from './revenue-and-gst-return/revenue-and-gst-return-screen2/revenue-and-gst-return-screen2.component';
import { RevenueAndGstReturnDescriptionComponent } from './revenue-and-gst-return/revenue-and-gst-return-description/revenue-and-gst-return-description.component';




@NgModule({
  declarations: [
    AgingReportComponent,
    DailyActivityReportComponent,
    DebtorsListComponent,
    SuppliersListComponent,
    FuelDipReportComponent,
    KnockoffSummaryComponent,
    KnockoffDetailsComponent,
    PayableAnalysisComponent,
    GeneralLedgerComponent,
    TrialBalanceComponent,
    ChequesProcessedReportComponent,
    DepartmentsWeeklyReportComponent,
    CostMarginReportComponent,
    ProfitLossAccountComponent,
    MonthlyProfitLossAccountComponent,
    SupplierStatementComponent,
    PurchaseReportComponent,
    MonthlyComparisonReportsComponent,
    SalesAndCashReconciliationSheetComponent,
    SalesPerformanceComponent,
    ExpenseReportComponent,
    CashFlowManagementComponent,
    GMAnalysisComponent,
    TargetAndSalesComponent,
    DailyActivityGComponent,
    DailyActivityDComponent,
    DailyActivityISComponent,
    DailyActivityPComponent,
    SalesDepartmentComponent,
    DailyLotteryComponent,
    RevenueAndGstReturnComponent,
    RevenueAndGstReturnScreen2Component,
    RevenueAndGstReturnDescriptionComponent,
  ],
  imports: [
    CommonModule,
	FormsModule,
	ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class ReportsModule { }
