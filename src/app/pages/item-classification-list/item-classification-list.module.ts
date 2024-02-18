import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from "../../material.module";
import { RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ItemClassificationListComponent } from './item-classification-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CustomIconModule } from 'src/app/components/custom-icon/custom-icon.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ProductComponent } from './new-product/new-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ServiceComponent } from './new-service/new-service.component';


@NgModule({
    declarations: [
        ItemClassificationListComponent,
        ProductComponent,
        ServiceComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        MaterialComponentsModule,
        RouterLink,
        ReactiveFormsModule,
        FormsModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
        CustomIconModule,
        MatDialogModule,
        FileUploadModule
    ],
    providers: [],
    // entryComponents: [ProductComponent , FileUploadModule]
})
export class ItemClassificationListModule { }
