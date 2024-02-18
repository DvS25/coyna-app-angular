import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccountRoutingModule } from './user-account-routing.module';
import { ProfileComponent } from "./profile/profile.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UtilityHelper } from "../../shared";


@NgModule({
  declarations: [
    ProfileComponent
  ],
    imports: [
        CommonModule,
        UserAccountRoutingModule,
        ReactiveFormsModule
    ],
    providers: [UtilityHelper]
})
export class UserAccountModule { }
