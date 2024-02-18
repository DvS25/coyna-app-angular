import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { AuthComponent } from './layouts/auth/auth.component';
import { FullPageComponent } from './layouts/full-page/full-page.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { HttpErrorInterceptor, UserService } from "./shared";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from '@angular/flex-layout';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { MainHeaderComponent } from "./components/header/main-header/main-header.component";
import { MainFooterComponent } from "./components/footer/main-footer/main-footer.component";
import { HeaderInterceptor } from "./shared/interceptor/header.interceptor";
import { NgxSpinnerModule } from 'ngx-spinner';
import { SignupComponent } from './pages/authentication/signup/signup.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CustomIconModule } from './components/custom-icon/custom-icon.component';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        FullPageComponent,
        AdminComponent,
        SideMenuComponent,
        MainHeaderComponent,
        MainFooterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule, FormsModule, CommonModule,
        FlexLayoutModule,
        NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
        SweetAlert2Module.forRoot(),
        ToastrModule.forRoot(),
        CustomIconModule,
        FileUploadModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderInterceptor,
            multi: true
        },
        UserService,
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
                floatLabel: 'always',
                subscriptSizing: 'dynamic'
            },
        }
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
