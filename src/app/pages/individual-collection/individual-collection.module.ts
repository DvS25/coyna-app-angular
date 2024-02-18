import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndcollComponent } from './individual-collection.component';
import {MaterialComponentsModule} from "../../material.module";
import {RouterLink} from "@angular/router";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    IndcollComponent
  ],
    imports: [
        CommonModule,
        MaterialComponentsModule,
        RouterLink,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class IndcollModule { }
