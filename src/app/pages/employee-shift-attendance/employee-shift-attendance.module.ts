import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftattComponent } from './employee-shift-attendance.component';
import {MaterialComponentsModule} from "../../material.module";
import {RouterLink} from "@angular/router";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ShiftattComponent
  ],
    imports: [
        CommonModule,
        MaterialComponentsModule,
        RouterLink,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class EmployeeShiftAttendanceModule { }
