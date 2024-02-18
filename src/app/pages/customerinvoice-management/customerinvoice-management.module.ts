import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule}                                   from "@angular/forms";
import { CustomerinvoiceComponent }                            from "./customerinvoice-management.component";
import {FinanceOnlyDirective, InvoiceManagementService, NumbersOnlyDirective,
    CharacterDirective, AlphabetOnlyDirective, CompanyService} from "../../shared";
import {MaterialComponentsModule}                              from "../../material.module";
import { EditCustomerinvoiceComponent }                        from './edit-customerinvoice/edit-customerinvoice.component';
import { DirectiveModule }                                     from 'src/app/shared/directive/directive.module';
import {TaxComponent}                                          from './tax/tax-components';

@NgModule({
    declarations: [
       CustomerinvoiceComponent,
        TaxComponent
        //NumbersOnlyDirective,
        //FinanceOnlyDirective,
        //CharacterDirective,
        //AlphabetOnlyDirective,
		//sEditInvoiceComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialComponentsModule,
        DirectiveModule
    ],
    exports: [
        //FinanceOnlyDirective,
        //CharacterDirective,
        //NumbersOnlyDirective,
    ],
              entryComponents: [TaxComponent],
    providers: [InvoiceManagementService, CompanyService]
})
export class CustomerinvoiceManagementModule { }
