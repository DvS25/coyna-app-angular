import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from "../../material.module";
import { RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CustomIconModule } from 'src/app/components/custom-icon/custom-icon.component';
import { ExpensePrintComponent } from './expense-print.component';


@NgModule({
    declarations: [
        ExpensePrintComponent
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
        CustomIconModule
    ],
    providers: []
})
export class ExpensePrintModule { }
