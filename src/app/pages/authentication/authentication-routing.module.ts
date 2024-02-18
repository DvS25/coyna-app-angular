import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { LockComponent } from "./lock/lock.component";
import { CreateComponent } from "./create/create.component";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DemoLoginComponent } from './demo-login/demo-login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { MobileVerificationComponent } from './mobileverification/mobile-verification.component';
import { CompanyPageComponent } from '../company-setup-page/company-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'lock',
    component: LockComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent
  },
  {
    path: 'create-account',
    component: CreateComponent
  },
  {
    path: 'Signup',
    component: SignupComponent
  },
  {
    path: 'MobileVerification',
    component: MobileVerificationComponent
  },
  { path: 'password-reset/:id', component: ResetPasswordComponent },
  { path: 'demo-login', component: DemoLoginComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
