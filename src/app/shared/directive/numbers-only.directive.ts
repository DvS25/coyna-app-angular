import { Directive, HostListener,Input, ElementRef } from "@angular/core";
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[financeOnly]'
})
export class FinanceOnlyDirective {
    // @ts-ignore
    @Input('field') field;

    constructor(private ngControl: NgControl) { }

    @HostListener('input', ['$event']) onInput(event:any): void {
            const value = event.target.value;
            // @ts-ignore
            this.ngControl.control.setValue(parseFloat(value) || '');
            if (value.slice(-1) === '.' && !value.slice(0, -1).includes('.')) {
                event.target.value = value;
            }
    }
}

@Directive({
    selector: "input[numbersOnly]"
})
export class NumbersOnlyDirective {
    constructor(private _el: ElementRef) {}
    @HostListener("keydown", ["$event"])
    onKeyDown(e: KeyboardEvent) {
        if (
            // Allow: Delete, Backspace, Tab, Escape, Enter
            [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
            (e.keyCode === 65 && e.ctrlKey === true) || // Allow: Ctrl+A
            (e.keyCode === 67 && e.ctrlKey === true) || // Allow: Ctrl+C
            (e.keyCode === 86 && e.ctrlKey === true) || // Allow: Ctrl+V
            (e.keyCode === 88 && e.ctrlKey === true) || // Allow: Ctrl+X
            (e.keyCode === 65 && e.metaKey === true) || // Cmd+A (Mac)
            (e.keyCode === 67 && e.metaKey === true) || // Cmd+C (Mac)
            (e.keyCode === 86 && e.metaKey === true) || // Cmd+V (Mac)
            (e.keyCode === 88 && e.metaKey === true) || // Cmd+X (Mac)
            (e.keyCode >= 35 && e.keyCode <= 39) // Home, End, Left, Right
        ) {
            return; // let it happen, don't do anything
        }
        // Ensure that it is a number and stop the keypress
        if (
            (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
            (e.keyCode < 96 || e.keyCode > 105)
        ) {
            e.preventDefault();
        }
    }

    
}
@Directive({
  selector: '[decimalOnly]'
})
export class DecimalOnlyDirective {
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = [46, 8, 9, 27, 13, 110, 190]; // Allow: Delete, Backspace, Tab, Escape, Enter, Decimal point
    if (allowedKeys.indexOf(event.keyCode) !== -1 ||
      (event.keyCode === 65 && event.ctrlKey === true) || // Allow: Ctrl+A
      (event.keyCode === 67 && event.ctrlKey === true) || // Allow: Ctrl+C
      (event.keyCode === 86 && event.ctrlKey === true) || // Allow: Ctrl+V
      (event.keyCode === 88 && event.ctrlKey === true) || // Allow: Ctrl+X
      (event.keyCode === 65 && event.metaKey === true) || // Cmd+A (Mac)
      (event.keyCode === 67 && event.metaKey === true) || // Cmd+C (Mac)
      (event.keyCode === 86 && event.metaKey === true) || // Cmd+V (Mac)
      (event.keyCode === 88 && event.metaKey === true) // Cmd+X (Mac)
    ) {
      return; // let it happen, don't do anything
    }

    // Ensure that it is a number or decimal point and stop the keypress
    if (
      (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) &&
      (event.keyCode < 96 || event.keyCode > 105) &&
      event.keyCode !== 190 
    ) {
      event.preventDefault();
    }
  }
}

@Directive({
  selector: '[negativeDecimalOnly]'
})
export class NegativeDecimalOnly {
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = [46, 8, 9, 27, 13, 110, 190]; // Allow: Delete, Backspace, Tab, Escape, Enter, Decimal point
    if (allowedKeys.indexOf(event.keyCode) !== -1 ||
      (event.keyCode === 65 && event.ctrlKey === true) || // Allow: Ctrl+A
      (event.keyCode === 67 && event.ctrlKey === true) || // Allow: Ctrl+C
      (event.keyCode === 86 && event.ctrlKey === true) || // Allow: Ctrl+V
      (event.keyCode === 88 && event.ctrlKey === true) || // Allow: Ctrl+X
      (event.keyCode === 65 && event.metaKey === true) || // Cmd+A (Mac)
      (event.keyCode === 67 && event.metaKey === true) || // Cmd+C (Mac)
      (event.keyCode === 86 && event.metaKey === true) || // Cmd+V (Mac)
      (event.keyCode === 88 && event.metaKey === true) // Cmd+X (Mac)
    ) {
      return; // let it happen, don't do anything
    }

    // Ensure that it is a number or decimal point and stop the keypress
    if (
      (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) &&
      (event.keyCode < 96 || event.keyCode > 105) &&
      event.keyCode !== 190 &&
      event.keyCode !== 189 && // Negative sign (hyphen)
      event.keyCode !== 109 
    ) {
      event.preventDefault();
    }
  }
}
