import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule} from "@angular/forms";
import { SupportComponent } from "./support.component";

@NgModule({
    declarations: [
        SupportComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    providers:[]
})
export class SupportModule { }
