import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialComponentsModule} from "../../material.module";
import {RouterLink} from "@angular/router";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { AddNewExpenseComponent } from './Add-new-expense.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
        AddNewExpenseComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        MaterialComponentsModule,
        RouterLink,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers:[]
})
export class AddNewExpenseModule { }
