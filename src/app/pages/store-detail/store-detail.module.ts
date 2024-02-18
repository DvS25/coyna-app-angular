import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule} from "@angular/forms";
import { StoredComponent } from "./store-detail.component";

@NgModule({
    declarations: [
        StoredComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    providers:[]
})
export class StoredModule { }
