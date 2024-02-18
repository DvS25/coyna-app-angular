import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from "../../material.module";
import { RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BillsComponent } from './bills.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CustomIconModule } from 'src/app/components/custom-icon/custom-icon.component';


@NgModule({
    declarations: [
        BillsComponent,        
    ],
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
        CustomIconModule   
    ],
    providers: []
})
export class BillsModule { }
