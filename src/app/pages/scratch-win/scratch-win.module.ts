import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScratchwinComponent } from './scratch-win.component';
import {MaterialComponentsModule} from "../../material.module";
import {RouterLink} from "@angular/router";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ScratchwinComponent
  ],
    imports: [
        CommonModule,
        MaterialComponentsModule,
        RouterLink,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class ScratchwinModule { }
