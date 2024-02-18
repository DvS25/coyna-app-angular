import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CompanyService } from "../../shared";
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CustomerInfoComponent } from './customer-info.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { FileUploadModule } from 'ng2-file-upload';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';

@NgModule({
    declarations: [
        // CustomerInfoComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatCheckboxModule,
        MatInputModule,
        MatDatepickerModule,
        MatIconModule,
        MatStepperModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        FileUploadModule

    ],
    providers: [CompanyService,
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
                floatLabel: 'always'
            },
        }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})


export class CustomerInfoModule { }
