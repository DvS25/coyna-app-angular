import { Directive, HostListener,Input, ElementRef } from "@angular/core";
import { NgControl } from '@angular/forms';
@Directive({
    selector: '[OnlyCharacterWithSpace]'
})
export class CharacterDirective {

    // @ts-ignore
    @Input() validationFieldsType: string;

    constructor(private el: ElementRef) { }

    @HostListener('keydown', ['$event']) onKeyDown(event: any) {

        let e = <KeyboardEvent>event;
        /*
            8 -  for backspace
            9 -  for tab
            13 - for enter
            27 - for escape
            46 - for delete
        */
        if ([8, 9, 13, 27, 46].indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+C
            (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+V
            (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+X
            (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        if (e.keyCode != 32 && ((e.keyCode < 65 || e.keyCode > 93))) {
            e.preventDefault();
        }
    }

    @HostListener('keyup', ['$event']) onKeyup(event: KeyboardEvent) {
        this.validateFields(event);
    }

    @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
        this.validateFields(event);
    }

    validateFields(event: any) {
        setTimeout(() => {
            this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '')
            event.preventDefault();
        }, 100)
    }
}


@Directive({
    selector: '[alphabetWithoutSpaceOnly]',
})
export class AlphabetOnlyDirective {
    @HostListener('input', ['$event'])
    onInputChange(event: KeyboardEvent) {
        const input = event.target as HTMLInputElement;
        const sanitized = input.value.replace(/[^a-zA-Z]*/g, '');

        input.value = sanitized;
    }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
        event.preventDefault();
        const input = event.target as HTMLInputElement;
        input.value = '';
    }
}
