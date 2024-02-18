import { JournalEntryComponent } from './journal-entry.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from "../../../material.module";
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
import { ChartOfAccountSetupService, DepartmentService } from 'src/app/shared';
import { MatInputModule } from '@angular/material/input';
import { JournalEntryService } from 'src/app/shared/service/apis/journal-entry.service';
import { MatStepperModule } from '@angular/material/stepper';
import { FileUploadModule } from 'ng2-file-upload';
import { VendorService } from 'src/app/shared/service/apis/vendor.service';
import { CustomerService } from 'src/app/shared/service/apis/customer.service';

@NgModule({
    declarations: [JournalEntryComponent],
    imports: [
        CommonModule,
        BrowserModule,
        MaterialComponentsModule,
        RouterLink,
        ReactiveFormsModule,
        FormsModule,
        MatTabsModule,
        MatPaginatorModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatDatepickerModule,
        CustomIconModule,
        MatInputModule,
        MatStepperModule,
        FileUploadModule
    ],
    providers: [ChartOfAccountSetupService, DepartmentService, JournalEntryService, VendorService, CustomerService]
})
export class JournalEntryModule { }
