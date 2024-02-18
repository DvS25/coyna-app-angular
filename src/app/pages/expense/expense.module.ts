import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from "../../material.module";
import { RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ExpenseComponent } from './expense.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CustomIconModule } from 'src/app/components/custom-icon/custom-icon.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
    declarations: [
        ExpenseComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        MaterialComponentsModule,
        RouterLink,
        ReactiveFormsModule,
        FormsModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
        CustomIconModule,
        FileUploadModule
    ],
    providers: []
})
export class ExpenseModule { }
