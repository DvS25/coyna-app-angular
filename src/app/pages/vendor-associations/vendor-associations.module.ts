import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialComponentsModule} from "../../material.module";
import {RouterLink} from "@angular/router";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { VendorAssociationsComponent } from "./vendor-associations.component";

@NgModule({
    declarations: [
        VendorAssociationsComponent
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
export class VendorAssociationsModule { }
