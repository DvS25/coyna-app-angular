import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionManagemenComponent } from './subscription-management.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { CustomIconModule } from 'src/app/components/custom-icon/custom-icon.component';


@NgModule({
  declarations: [
    SubscriptionManagemenComponent
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    FormsModule,
    CustomIconModule
  ]
})
export class SubscriptionManagemenModule { }
