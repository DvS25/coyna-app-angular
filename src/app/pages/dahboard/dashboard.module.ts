import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { DashboardRoutingModule } from './dashboard-routing.module';
// import { DashboardComponent } from './dashboard.component';
import { DashboardComponent } from "./dashboard.component";
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [
	DashboardComponent
  ],
  imports: [
    CommonModule,
	NgApexchartsModule,
    DashboardRoutingModule,
	ReactiveFormsModule,
    FormsModule
  ]
})
export class DashboardModule { }
