import { Directive, HostListener, HostBinding } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {
	el: any;
	
	constructor(private ngControl: NgControl) {
		this.el = ngControl;
	}
	
	// Listen for the input event to also handle copy and paste.
	@HostListener('input', ['$event.target.value'])
	onInput(value: string) {
		// Use NgControl patchValue to prevent the issue on validation
		//this.el.control.patchValue(value.replace(/[^0-9]/g, ''));
		this.el.control.patchValue(value.replace(/^[a-zA-Z0-9-]+$/g, ''));
	}
}