import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FueldipComponent } from './fuel-dip.component';
import {MaterialComponentsModule} from "../../material.module";
import {RouterLink} from "@angular/router";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    FueldipComponent
  ],
    imports: [
        CommonModule,
        MaterialComponentsModule,
        RouterLink,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class FueldipModule { }
