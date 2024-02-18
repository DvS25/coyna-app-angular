import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FinanceOnlyDirective, InvoiceManagementService, NumbersOnlyDirective,
    CharacterDirective, AlphabetOnlyDirective, CompanyService} from "../../shared";
import {MaterialComponentsModule} from "../../material.module";
import { DirectiveModule } from 'src/app/shared/directive/directive.module';
import { SalesOrderComponent } from './sales-order.component';
import { SalesOrderDetailComponent } from '../sales-order-detail/sales-order-detail.component';
import { SalesOrderEditComponent } from './sales-order-edit/sales-order-edit.component';
import { SalesOrderListingComponent } from '../sales-order-listing/sales-order-listing.component';
import { SalesOrderService } from 'src/app/shared/service/apis/sales-order.service';



@NgModule({
  declarations: [SalesOrderComponent,SalesOrderDetailComponent,SalesOrderEditComponent,SalesOrderListingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    DirectiveModule
  ],
  providers: [CompanyService, SalesOrderService]
})
export class SalesOrderModule { }
