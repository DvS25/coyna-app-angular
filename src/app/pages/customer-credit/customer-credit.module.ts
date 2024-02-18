import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CustomIconModule } from 'src/app/components/custom-icon/custom-icon.component';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { FileUploadModule } from 'ng2-file-upload';
import { CustomerCreditComponent } from './customer-credit.component';
import { CustomerService } from 'src/app/shared/service/apis/customer.service';
@NgModule({
    declarations: [CustomerCreditComponent],
    imports: [
        CommonModule,
        RouterLink,
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        MatTabsModule,
        MatPaginatorModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        CustomIconModule,
        MatInputModule,
        MatStepperModule,
        FileUploadModule
    ],
    providers: [CustomerService]
})
export class CustomerCreditModule { }
