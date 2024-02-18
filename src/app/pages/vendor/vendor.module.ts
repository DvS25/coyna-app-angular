import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule} from "@angular/forms";
import { VendorComponent } from "./vendor.component";
import { VendorListingComponent } from "../vendor-listing/vendor-listing.component";
import {MaterialComponentsModule} from "../../material.module";
import { EditVendorComponent } from './edit-vendor/edit-vendor.component';

// Multipart Data send

@NgModule({
    declarations: [
        VendorComponent,
        VendorListingComponent,
       EditVendorComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialComponentsModule
    ],
    providers:[]
})
export class VendorModule { }
