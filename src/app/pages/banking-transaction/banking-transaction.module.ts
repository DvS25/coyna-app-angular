import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialComponentsModule} from "../../material.module";
import {RouterLink} from "@angular/router";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { BankingTransactionComponent } from "./banking-transaction.component";

@NgModule({
    declarations: [
        BankingTransactionComponent
    ],
    imports: [
        CommonModule,
        MaterialComponentsModule,
        RouterLink,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers:[]
})
export class BankingTransactionModule { }
