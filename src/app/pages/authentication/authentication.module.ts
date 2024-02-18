import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from "./login/login.component";
import { LockComponent } from "./lock/lock.component";
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserService } from "../../shared";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DemoLoginComponent } from './demo-login/demo-login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { MobileVerificationComponent } from './mobileverification/mobile-verification.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { CompanyPageComponent } from '../company-setup-page/company-page.component';
import { MatSelectModule } from '@angular/material/select';
import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { CustomerInfoComponent } from '../customer-info/customer-info.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { ProductComponent } from '../item-classification-list/new-product/new-product.component';
// import { ServiceComponent } from '../item-classification-list/new-service/new-service.component';
import { FileUploadModule } from 'ng2-file-upload';
import { CustomIconModule } from 'src/app/components/custom-icon/custom-icon.component';
@NgModule({
  declarations: [
    LoginComponent,
    LockComponent,
    ForgotpasswordComponent,
    CreateComponent,
    ResetPasswordComponent,
    DemoLoginComponent,
    SignupComponent,
    MobileVerificationComponent,
    CompanyPageComponent,
    CustomerInfoComponent,
    // ProductComponent,
    // ServiceComponent

  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    NgOtpInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    FileUploadModule,
    CustomIconModule
  ],
  providers: [UserService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AuthenticationModule { }
