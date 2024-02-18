// import { FormGroup, ValidatorFn } from '@angular/forms';
//
// /** this control value must be equal to given control's value */
// export function equalValueValidator(targetKey: string, toMatchKey: string): ValidatorFn {
//     // @ts-ignore
//     return (group: FormGroup): { [p: string]: any } | null => {
//         const target = group.controls[targetKey];
//         const toMatch = group.controls[toMatchKey];
//         if (target.touched && toMatch.touched) {
//             const isMatch = target.value === toMatch.value;
//             // set equal value error on dirty controls
//             if (!isMatch && target.valid && toMatch.valid) {
//                 toMatch.setErrors({equalValue: targetKey});
//                 const message = targetKey + ' != ' + toMatchKey;
//                 return {'equalValue': message};
//             }
//             if (isMatch && toMatch.hasError('equalValue')) {
//                 toMatch.setErrors(null);
//             }
//         }
//
//         return null;
//     };
// }

import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class CompareValidation {
    static match(controlName: string, checkControlName: string): ValidatorFn {
        return (controls: AbstractControl) => {
            const control = controls.get(controlName);
            const checkControl = controls.get(checkControlName);

            // @ts-ignore
            if (checkControl.errors && !checkControl.errors.matching) {
                return null;
            }

            // @ts-ignore
            if (control.value < checkControl.value) {
                // @ts-ignore
                controls.get(checkControlName).setErrors({ greater: true });
                return { greater: true };
            } else {
                return null;
            }
        };
    }
}
