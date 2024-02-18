import { ExpenseModule } from './../pages/expense/expense.module';
import { NgModule } from '@angular/core';
import { Constants } from './config/constants';
import { EmailValidatorDirective } from "./directive/email-validation.directive";
import { ApiService, HttpServices } from './service';
import { DashboardComponent } from '../pages/dahboard/dashboard.component';
import { UserAccountModule } from "../pages/user-account/user-account.module";
import { RouterLink } from "@angular/router";
import { ErrorModule } from "../pages/error/error.module";
import { AuthService } from "./service/apis/auth.service";
import {
    AuthGuard,
    EmployeeShiftSheetAuthGuard,
    ManageShiftSheetAuthGuard,
} from "./guard/auth-guard.service";
import { JwtModule } from "@auth0/angular-jwt";
import { BrowserDB } from "./helper/browserDB";
import { CryptoService } from "./helper/cryptoJs";
import { CompanyModule } from "../pages/add-company/add-company.module";
import { CompanylModule } from "../pages/company/company.module";
import { VendorModule } from "../pages/vendor/vendor.module";
import { VendordModule } from "../pages/vendor-detail/vendor-detail.module";
import { CompanydModule } from "../pages/company-detail/company-detail.module";
import { FinanceModule } from "../pages/finance/finance.module";
import { OperationModule } from "../pages/operation/operation.module";
import { AFinanceModule } from "../pages/finance-listing/finance-listing.module";
import { OperationlModule } from "../pages/operation-listing/operation-listing.module";
import { IsLoginAuthGuard } from "./guard/auth-is-login.guard";
import { SalesModule } from "../pages/sales/sales.module";
import { AccountModule } from "../pages/invoice-listing/invoice-listing.module";
import { AddressHelper } from "./helper/address.helper";

import { MaterialComponentsModule } from "../material.module";
import { ReactiveFormsModule } from "@angular/forms";

import { InvoiceManagementModule } from "../pages/invoice-management/invoice-management.module";
import { PaymentProcessingModule } from "../pages/payment-processing/paymnet-processing.module";
import { ExpenseManagementModule } from "../pages/expense-management/expense-management.module";
import { IndcollModule } from "../pages/individual-collection/individual-collection.module";
import { ScratchwinModule } from "../pages/scratch-win/scratch-win.module";
import { DashboardModule } from "../pages/dahboard/dashboard.module";
import { VendorAssociationsModule } from "../pages/vendor-associations/vendor-associations.module";
import { FueldipModule } from "../pages/fuel-dip/fuel-dip.module";
import { StoremgntModule } from "../pages/store-management/store-management.module";
import { InvoicedModule } from "../pages/invoice-detail/invoice-detail.module";
import { StoredModule } from "../pages/store-detail/store-detail.module";
import { ReportsModule } from "../pages/reports/reports.module";
import { AddBankModule } from "../pages/add-bank/add-bank.module";
import { AddRoleModule } from "../pages/add-role/add-role.module";
import { RoleListModule } from "../pages/role-list/role-list.module";
import { BankingTransactionModule } from "../pages/banking-transaction/banking-transaction.module";
import { AccountTransactionModule } from '../pages/account-transaction/account-transaction.module';
import { SupplierModule } from '../pages/supplier-detail/supplier-detail.module';
import { CustomerModule } from '../pages/customer/customer.module';
import { SalesOrderModule } from '../pages/sales-order/sales-order.module';
import { CustomerAssociationsModule } from "../pages/customer-associations/customer-associations.module";
import { CustomeraccountModule } from "../pages/customerinvoice-listing/customerinvoice-listing.module";
import { CustomerinvoiceManagementModule } from "../pages/customerinvoice-management/customerinvoice-management.module";
import { CustomerinvoicedModule } from "../pages/customerinvoice-detail/customerinvoice-detail.module";
import { CustomerpaymentProcessingModule } from "../pages/customerpayment-processing/customerpaymnet-processing.module";
import { CustomerexpenseManagementModule } from "../pages/customerexpense-management/customerexpense-management.module";
import { VendorExpenseModule } from '../pages/vendor-expense/vendor-expense.module';
import { AddNewExpenseModule } from '../pages/Add-new-expense/Add-new-expense.module';
import { PrintExpenseModule } from '../pages/print-expense/print-expense.module';
import { VendorListModule } from '../pages/vendor-list/vendor-list.module';
import { VendorPrintListModule } from '../pages/print-vendor/print-vendor.module';
import { SubscriptionManagemenModule } from '../pages/subscription-management/subscription-management.module';
import { BillsModule } from '../pages/Bills/bills.module';
import { JournalEntryModule } from '../pages/journal-entry/journal-entry/journal-entry.module';
import { JournalEntryViewModule } from '../pages/journal-entry/journal-entry-view/journal-entry-view.module';
import { ItemClassificationListModule } from '../pages/item-classification-list/item-classification-list.module';
import { CustomerCreditModule } from '../pages/customer-credit/customer-credit.module';
import { AddBillsModule } from '../pages/Add-Bills/Add-Bills.module';
import { UnPaidModule } from '../pages/un-paid/un-paid.module';

@NgModule({
    declarations: [

    ],
    imports: [
        UserAccountModule,
        DashboardModule,
        RouterLink,
        ErrorModule,
        CompanyModule,
        CompanylModule,
        CompanydModule,
        VendorModule,
        VendorExpenseModule,
        AddNewExpenseModule,
        PrintExpenseModule,
        VendordModule,
        VendorListModule,
        VendorPrintListModule,
        ItemClassificationListModule,
        CustomerCreditModule,
        FinanceModule,
        OperationModule,
        AFinanceModule,
        OperationlModule,
        SalesModule,
        AccountModule,
        InvoiceManagementModule,
        //PaymentProcessingModule,
        //CustomerpaymentProcessingModule,
        //ExpenseManagementModule,
        IndcollModule,
        ScratchwinModule,
        FueldipModule,
        StoremgntModule,
        InvoicedModule,
        StoredModule,
        ReportsModule,
        AccountTransactionModule,
        SupplierModule,
        JwtModule.forRoot({
            config: {
                // @ts-ignore
                tokenGetter: '3JaJfaUDKKYgpWtYFYGv0S6vCCIW4QuujAPgeTDO',
                allowedDomains: ["http://localhost:4200"],
                disallowedRoutes: [""],
            },
        }),
        MaterialComponentsModule,
        ReactiveFormsModule,
        SubscriptionManagemenModule,
        BillsModule,
        JournalEntryModule,
        JournalEntryViewModule,
        ExpenseModule,
        AddBillsModule,
        UnPaidModule
    ],
    providers: [ApiService, Constants, HttpServices, AuthService, AuthGuard, BrowserDB,
        ManageShiftSheetAuthGuard, EmployeeShiftSheetAuthGuard,
        CryptoService, IsLoginAuthGuard, AddressHelper],
    bootstrap: []
})
export class SharedModule {
}
