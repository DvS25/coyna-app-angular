import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialComponentsModule} from "../../material.module";
import {RouterLink} from "@angular/router";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { VendorListComponent } from './vendor-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    declarations: [
        VendorListComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        MaterialComponentsModule,
        RouterLink,
        ReactiveFormsModule,
        FormsModule,
        MatPaginatorModule
    ],
    providers:[]
})
export class VendorListModule { }
