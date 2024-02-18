import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialComponentsModule} from "../../material.module";
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from 'src/app/shared/directive/directive.module';
import { CustomerListingComponent } from '../customer-listing/customer-listing.component';
import { CustomerDetailComponent } from '../customer-detail/customer-detail.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
@NgModule({
  declarations: [CustomerComponent, CustomerListingComponent, CustomerDetailComponent, EditCustomerComponent],
  imports: [
    CommonModule,
        MaterialComponentsModule,
        ReactiveFormsModule,
        FormsModule,
        DirectiveModule,
        CommonModule
  ],
})
export class CustomerModule { }
