import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from "@angular/forms";
import { CompanyComponent } from "./add-company.component";
import { CompanyService } from "../../shared";
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
    declarations: [
        CompanyComponent
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
        MatButtonModule
    ],
    providers: [CompanyService,
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
                floatLabel: 'always'
            },
        }]
})
export class CompanyModule { }
