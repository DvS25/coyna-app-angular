import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialComponentsModule} from "../../material.module";
import {RouterLink} from "@angular/router";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { AccountTransactionComponent } from "./account-transaction.component";
import { CompanyService } from 'src/app/shared';

@NgModule({
    declarations: [
        AccountTransactionComponent
    ],
    imports: [
        CommonModule,
        MaterialComponentsModule,
        RouterLink,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers:[CompanyService]
})
export class AccountTransactionModule { }
