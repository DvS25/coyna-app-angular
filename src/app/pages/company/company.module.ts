import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanylComponent } from './company.component';
import {MaterialComponentsModule} from "../../material.module";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { EditCompanyComponent } from './edit-company/edit-company.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CompanylComponent,
    EditCompanyComponent
  ],
    imports: [
        CommonModule,ReactiveFormsModule,

        MaterialComponentsModule,
        RouterLink,
        FormsModule
    ]
})
export class CompanylModule { }
