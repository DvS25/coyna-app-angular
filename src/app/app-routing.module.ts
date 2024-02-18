import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from "./layouts/auth/auth.component";
import { DashboardComponent } from './pages/dahboard/dashboard.component';
import { CompanyComponent } from './pages/add-company/add-company.component';
import { CompanylComponent } from './pages/company/company.component';
import { EditCompanyComponent } from "./pages/company/edit-company/edit-company.component";
import { OperationComponent } from './pages/operation/operation.component';
import { OperationlComponent } from './pages/operation-listing/operation-listing.component';
import { FinanceComponent } from './pages/finance/finance.component';
import { AFinanceComponent } from './pages/finance-listing/finance-listing.component';
import { VendorComponent } from './pages/vendor/vendor.component';
import { VendordComponent } from './pages/vendor-detail/vendor-detail.component';
import { VendorListingComponent } from "./pages/vendor-listing/vendor-listing.component";
import { CompanydComponent } from './pages/company-detail/company-detail.component';
import { StoredComponent } from './pages/store-detail/store-detail.component';
import { InvoicedComponent } from './pages/invoice-detail/invoice-detail.component';
import { InvoiceComponent } from './pages/invoice-management/invoice-management.component';
import { PaymentComponent } from './pages/payment-processing/payment-processing.component';
import { AccountComponent } from './pages/invoice-listing/invoice-listing.component';
// import {ShiftattComponent} from './pages/employee-shift-attendance/employee-shift-attendance.component';
// import { ExpenseComponent } from './pages/expense-management/expense-management.component';
import { IndcollComponent } from './pages/individual-collection/individual-collection.component';
import { ProfileComponent } from "./pages/user-account/profile/profile.component";
import { FullPageComponent } from "./layouts/full-page/full-page.component";
import { Error400Component } from "./pages/error/error400/error400.component";
import { Error404Component } from "./pages/error/error404/error404.component";
import { AuthGuard, ManageShiftSheetAuthGuard, EmployeeShiftSheetAuthGuard } from "./shared/guard/auth-guard.service";
import { IsLoginAuthGuard } from "./shared/guard/auth-is-login.guard";
import { SalesComponent } from "./pages/sales/sales.component";
import { ScratchwinComponent } from "./pages/scratch-win/scratch-win.component";
import { FueldipComponent } from "./pages/fuel-dip/fuel-dip.component";
import { SupportComponent } from "./pages/support/support.component";
import { StoremgntComponent } from "./pages/store-management/store-management.component";
import { AddStore } from "./pages/store-management/add-store/add-store.component";
import { EditVendorComponent } from "./pages/vendor/edit-vendor/edit-vendor.component";
import { EditInvoiceComponent } from "./pages/invoice-management/edit-invoice/edit-invoice.component";
import { EditStoreComponent } from "./pages/store-management/edit-store/edit-store.component";
import { AgingReportComponent } from './pages/reports/aging-report/aging-report.component';
import { DailyActivityReportComponent } from './pages/reports/daily-activity-report/daily-activity-report.component';
import { DebtorsListComponent } from './pages/reports/debtors-list/debtors-list.component';
import { FuelDipReportComponent } from './pages/reports/fuel-dip-report/fuel-dip-report.component';
import { KnockoffDetailsComponent } from './pages/reports/knockoff-details/knockoff-details.component';
import { KnockoffSummaryComponent } from './pages/reports/knockoff-summary/knockoff-summary.component';
import { SuppliersListComponent } from './pages/reports/suppliers-list/suppliers-list.component';
import { PayableAnalysisComponent } from './pages/reports/payable-analysis/payable-analysis.component';
import { GeneralLedgerComponent } from './pages/reports/general-ledger/general-ledger.component';
import { TrialBalanceComponent } from './pages/reports/trial-balance/trial-balance.component';
import { ChequesProcessedReportComponent } from './pages/reports/cheques-processed-report/cheques-processed-report.component';
import { DepartmentsWeeklyReportComponent } from './pages/reports/departments-weekly-report/departments-weekly-report.component';
import { CostMarginReportComponent } from './pages/reports/cost-margin-report/cost-margin-report.component';
import { ProfitLossAccountComponent } from './pages/reports/profit-loss-account/profit-loss-account.component';
import { MonthlyProfitLossAccountComponent } from './pages/reports/monthly-profit-loss-account/monthly-profit-loss-account.component';
import { SupplierStatementComponent } from './pages/reports/supplier-statement/supplier-statement.component';
import { PurchaseReportComponent } from './pages/reports/purchase-report/purchase-report.component';
import { MonthlyComparisonReportsComponent } from './pages/reports/monthly-comparison-reports/monthly-comparison-reports.component';
import { SalesAndCashReconciliationSheetComponent } from './pages/reports/sales-and-cash-reconciliation-sheet/sales-and-cash-reconciliation-sheet.component';
import { SalesPerformanceComponent } from './pages/reports/sales-performance/sales-performance.component';
import { ExpenseReportComponent } from './pages/reports/expense-report/expense-report.component';
import { CashFlowManagementComponent } from './pages/reports/cash-flow-management/cash-flow-management.component';
import { TargetAndSalesComponent } from './pages/reports/target-and-sales/target-and-sales.component';
import { GMAnalysisComponent } from './pages/reports/gmanalysis/gmanalysis.component';
import { DailyActivityDComponent } from './pages/reports/daily-activity-report/daily-activity-d/daily-activity-d.component';
import { DailyActivityGComponent } from './pages/reports/daily-activity-report/daily-activity-g/daily-activity-g.component';
import { DailyActivityISComponent } from './pages/reports/daily-activity-report/daily-activity-is/daily-activity-is.component';
import { DailyActivityPComponent } from './pages/reports/daily-activity-report/daily-activity-p/daily-activity-p.component';
import { SalesDepartmentComponent } from './pages/reports/daily-activity-report/daily-activity-is/sales-department/sales-department.component';
import { DailyLotteryComponent } from './pages/reports/daily-lottery/daily-lottery.component';
import { RevenueAndGstReturnComponent } from './pages/reports/revenue-and-gst-return/revenue-and-gst-return.component';
import { RevenueAndGstReturnScreen2Component } from './pages/reports/revenue-and-gst-return/revenue-and-gst-return-screen2/revenue-and-gst-return-screen2.component';
import { RevenueAndGstReturnDescriptionComponent } from './pages/reports/revenue-and-gst-return/revenue-and-gst-return-description/revenue-and-gst-return-description.component';
import { AccountTransactionComponent } from './pages/account-transaction/account-transaction.component';
import { AccessControlComponent } from './pages/access-control/access-control.component';
import { VendorAssociationsComponent } from './pages/vendor-associations/vendor-associations.component';
import { BankingTransactionComponent } from './pages/banking-transaction/banking-transaction.component';
import { AddBankComponent } from './pages/add-bank/add-bank.component';
import { AddRoleComponent } from './pages/add-role/add-role.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { SupplierComponent } from './pages/supplier-detail/supplier-detail.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerListingComponent } from './pages/customer-listing/customer-listing.component';
import { CustomerDetailComponent } from './pages/customer-detail/customer-detail.component';
import { EditCustomerComponent } from './pages/customer/edit-customer/edit-customer.component';
import { ResetPasswordComponent } from './pages/authentication/reset-password/reset-password.component';
import { CustomerAssociationsComponent } from './pages/customer-associations/customer-associations.component';
import { CustomeraccountComponent } from './pages/customerinvoice-listing/customerinvoice-listing.component';
import { CustomerinvoiceComponent } from './pages/customerinvoice-management/customerinvoice-management.component';
import { EditCustomerinvoiceComponent } from "./pages/customerinvoice-management/edit-customerinvoice/edit-customerinvoice.component";
import { CustomerinvoicedComponent } from './pages/customerinvoice-detail/customerinvoice-detail.component';
import { CustomerpaymentComponent } from './pages/customerpayment-processing/customerpayment-processing.component';
import { CustomerexpenseComponent } from './pages/customerexpense-management/customerexpense-management.component';
import { VendorExpenseComponent } from './pages/vendor-expense/vendor-expense.component';
import { AddNewExpenseComponent } from './pages/Add-new-expense/Add-new-expense.component';
import { PrintExpenseComponent } from './pages/print-expense/print-expense.component';
import { VendorListComponent } from './pages/vendor-list/vendor-list.component';
import { CompanyPageComponent } from './pages/company-setup-page/company-page.component';
import { CustomerInfoComponent } from './pages/customer-info/customer-info.component';
import { VendorPrintListComponent } from './pages/print-vendor/print-vendor.component';
import { GetChartOfAccountSetupComponent } from './pages/chart-of-account-setup/get-chart-of-account-setup/get-chart-of-account-setup.component';
import { GetDepartmentComponent } from './pages/department/get-department/get-department/get-department.component';
import { GetExpenseIncomeRegistersComponent } from './pages/chart-of-account-setup/expense-income-registers/get-expense-income-registers/get-expense-income-registers.component';
import { GetUserComponent } from './pages/user/get-user/get-user.component';
import { SubscriptionManagemenComponent } from './pages/subscription-management/subscription-management.component';
import { BillsComponent } from './pages/Bills/bills.component';
import { GetCustomerComponent } from './pages/customer/get-customer/get-customer.component';
import { JournalEntryComponent } from './pages/journal-entry/journal-entry/journal-entry.component';
import { JournalEntryViewComponent } from './pages/journal-entry/journal-entry-view/journal-entry-view.component';
import { PrintCustomerComponent } from './pages/customer/print-customer/print-customer.component';
import { ItemClassificationListComponent } from './pages/item-classification-list/item-classification-list.component';
import { ExpenseComponent } from './pages/expense/expense.component';
import { GetInvoiceComponent } from './pages/invoice/get-invoice/get-invoice.component';
import { AddInvoiceComponent } from './pages/invoice/add-invoice/add-invoice.component';
import { CustomerCreditComponent } from './pages/customer-credit/customer-credit.component';
import { ExpensePrintModule } from './pages/expense-print/expense-print.module';
import { ExpensePrintComponent } from './pages/expense-print/expense-print.component';
import { AddBillsComponent } from './pages/Add-Bills/Add-Bills.component';
import { UnPaidComponent } from './pages/un-paid/un-paid.component';
// import { GetExpenseIncomeRegistersComponent } from './pages/chart-of-account-setup/expense-income-registers/get-expense-income-registers/get-expense-income-registers.component';

let routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '', redirectTo: 'Signup', pathMatch: 'full' },
    { path: '', redirectTo: 'forgotPassword', pathMatch: 'full' },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '', redirectTo: 'Signup', pathMatch: 'full' },
    { path: '', redirectTo: 'MobileVerification', pathMatch: 'full' },
    { path: '', redirectTo: 'add-company', pathMatch: 'full' },
    { path: '', redirectTo: 'password-reset/:id', pathMatch: 'full' },
    {
        path: '',
        component: AuthComponent,
        // canActivate: [IsLoginAuthGuard],
        loadChildren: () => import('./pages/authentication/authentication.module').then((m) => m.AuthenticationModule),
    },
    { path: 'add-company', component: CompanyComponent, data: { requiresLogin: true } },
    // { path: 'coa-report', component: GetExpenseIncomeRegistersComponent, data: { requiresLogin: true } },

    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { requiresLogin: true } },
            { path: 'companysetupinfo', component: CompanyPageComponent, data: { requiresLogin: true } },
            { path: 'customerinfo', component: CustomerInfoComponent, data: { requiresLogin: true } },
            { path: 'company', component: CompanylComponent },
            { path: 'operation', component: OperationComponent },
            { path: 'user', component: FinanceComponent },
            { path: 'operation-listing', component: OperationlComponent },
            { path: 'user-listing', component: AFinanceComponent },
            { path: 'vendor', component: VendorComponent },
            { path: 'vendor-listing', component: VendorListingComponent },
            { path: 'vendor-details/:id', component: VendordComponent },
            { path: 'vendor/edit/:id', component: EditVendorComponent },
            { path: 'company/edit/:id', component: EditCompanyComponent },
            { path: 'company-detail/:id', component: CompanydComponent },
            { path: 'store-details/:id', component: StoredComponent },
            { path: 'store/edit/:id', component: EditStoreComponent },
            { path: 'invoice-details/:id', component: InvoicedComponent },
            { path: 'invoice/edit/:id', component: EditInvoiceComponent },
            { path: 'invoice-management', component: InvoiceComponent },
            { path: 'payment-processing/:id', component: PaymentComponent },
            { path: 'invoice-listing', component: AccountComponent },
            // {path: 'employee-shift-attendance', component: ShiftattComponent},
            // { path: 'expense-management', component: ExpenseComponent },
            { path: 'sales', component: SalesComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'individual-collection', component: IndcollComponent },
            { path: 'scratch-win', component: ScratchwinComponent },
            /*{path: 'shift-sheet/employee', canActivate:[EmployeeShiftSheetAuthGuard], component: ShiftSheetComponent },
            {path: 'shift-sheet/manager', canActivate:[ManageShiftSheetAuthGuard], component: ShiftSheetManagerComponent},*/
            { path: 'fuel-dip', component: FueldipComponent },
            { path: 'support', component: SupportComponent },
            { path: 'store-management', component: StoremgntComponent },
            { path: 'add-store', component: AddStore },
            { path: 'aging-report', component: AgingReportComponent },
            { path: 'daily-activity-report', component: DailyActivityReportComponent },
            { path: 'debtors-list', component: DebtorsListComponent },
            { path: 'fuel-dip-report', component: FuelDipReportComponent },
            { path: 'knockoff-details', component: KnockoffDetailsComponent },
            { path: 'knockoff-summary', component: KnockoffSummaryComponent },
            { path: 'suppliers-list', component: SuppliersListComponent },
            { path: 'payable-analysis', component: PayableAnalysisComponent },
            { path: 'suppliers-list', component: SuppliersListComponent },
            { path: 'general-ledger', component: GeneralLedgerComponent },
            { path: 'trial-balance', component: TrialBalanceComponent },
            { path: 'cheques-processed-report', component: ChequesProcessedReportComponent },
            { path: 'departments-weekly-report', component: DepartmentsWeeklyReportComponent },
            { path: 'cost-margin-report', component: CostMarginReportComponent },
            { path: 'profit-loss-account', component: ProfitLossAccountComponent },
            { path: 'monthly-profit-loss-account', component: MonthlyProfitLossAccountComponent },
            { path: 'supplier-statement', component: SupplierStatementComponent },
            { path: 'purchase-report', component: PurchaseReportComponent },
            { path: 'monthly-comparison-reports', component: MonthlyComparisonReportsComponent },
            { path: 'sales-and-cash-reconciliation-sheet', component: SalesAndCashReconciliationSheetComponent },
            { path: 'sales-performance', component: SalesPerformanceComponent },
            { path: 'expense-report', component: ExpenseReportComponent },
            { path: 'cash-flow-management', component: CashFlowManagementComponent },
            { path: 'target-and-sales', component: TargetAndSalesComponent },
            { path: 'gmanalysis', component: GMAnalysisComponent },
            { path: 'daily-activity-d', component: DailyActivityDComponent },
            { path: 'daily-activity-g', component: DailyActivityGComponent },
            { path: 'daily-activity-is', component: DailyActivityISComponent },
            { path: 'daily-activity-p', component: DailyActivityPComponent },
            { path: 'sales-department', component: SalesDepartmentComponent },
            { path: 'daily-lottery', component: DailyLotteryComponent },
            { path: 'revenue-and-gst-return', component: RevenueAndGstReturnComponent },
            { path: 'revenue-and-gst-return-screen2', component: RevenueAndGstReturnScreen2Component },
            { path: 'revenue-and-gst-return-description', component: RevenueAndGstReturnDescriptionComponent },
            { path: 'account-transaction', component: AccountTransactionComponent },
            { path: 'access-control', component: AccessControlComponent },
            { path: 'vendor-associations', component: VendorAssociationsComponent },
            { path: 'banking-transaction', component: BankingTransactionComponent },
            { path: 'add-bank', component: AddBankComponent },
            { path: 'add-role', component: AddRoleComponent },
            { path: 'role-list', component: RoleListComponent },
            { path: 'supplier-detail/:result/', component: SupplierComponent },
            { path: 'customer', component: CustomerComponent },
            { path: 'customer-listing', component: CustomerListingComponent },
            { path: 'customer-detail/:id', component: CustomerDetailComponent },
            { path: 'customer/edit/:id', component: EditCustomerComponent },
            // { path: 'password-reset/:id', component: ResetPasswordComponent },
            { path: 'customer-associations', component: CustomerAssociationsComponent },
            { path: 'customerinvoice-listing', component: CustomeraccountComponent },
            { path: 'customerinvoice-management', component: CustomerinvoiceComponent },
            { path: 'customerinvoice/edit/:id', component: EditCustomerinvoiceComponent },
            { path: 'customerinvoice-details/:id', component: CustomerinvoicedComponent },
            { path: 'customerpayment-processing/:id', component: CustomerpaymentComponent },
            { path: 'customerexpense-management', component: CustomerexpenseComponent },
            { path: 'vendor-expense', component: VendorExpenseComponent },
            { path: 'add-new-expense', component: AddNewExpenseComponent },
            { path: 'print-expense', component: PrintExpenseComponent },
            { path: 'vendor-list', component: VendorListComponent },
            { path: 'print-vendor', component: VendorPrintListComponent },
            { path: 'chart-of-account-setup', component: GetChartOfAccountSetupComponent },
            { path: 'department', component: GetDepartmentComponent },
            { path: 'expense-income-registers', component: GetExpenseIncomeRegistersComponent },
            { path: 'coa-report', component: GetExpenseIncomeRegistersComponent },
            { path: 'subscription-management', component: SubscriptionManagemenComponent },
            { path: 'bills', component: BillsComponent },
            { path: 'journal-entry', component: JournalEntryComponent },
            { path: 'customer-list', component: GetCustomerComponent },
            { path: 'user-list', component: GetUserComponent },
            { path: 'journal-entry/:id', component: JournalEntryViewComponent },
            { path: 'print-customer', component: PrintCustomerComponent },
            { path: 'item-classification-list', component: ItemClassificationListComponent },
            { path: 'customer-credit', component: CustomerCreditComponent },
            { path: 'expense/:id', component: ExpenseComponent },
            { path: 'invoice-list', component: GetInvoiceComponent },
            { path: 'add-invoice', component: AddInvoiceComponent },
            { path: 'expense-print', component: ExpensePrintComponent },
            { path: 'AddBills', component: AddBillsComponent },
            { path: 'UnPaid', component: UnPaidComponent },
        ]
    },
    {
        path: '**',
        component: FullPageComponent,
        children: [
            { path: '', component: Error404Component }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes), CommonModule],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
