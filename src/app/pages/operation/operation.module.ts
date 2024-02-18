import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule} from "@angular/forms";
import { OperationComponent } from "./operation.component";

@NgModule({
    declarations: [
        OperationComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    providers:[]
})
export class OperationModule { }
