import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DecimalOnlyDirective, FinanceOnlyDirective, NegativeDecimalOnly, NumbersOnlyDirective} from "./numbers-only.directive";

@NgModule({
    declarations: [
       FinanceOnlyDirective,
        NumbersOnlyDirective,
        DecimalOnlyDirective,
        NegativeDecimalOnly
    ],
    imports: [
    ],
    exports:[FinanceOnlyDirective,
            NumbersOnlyDirective,
        DecimalOnlyDirective,
    NegativeDecimalOnly],
    providers:[]
})
export class DirectiveModule {
}
