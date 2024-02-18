import { Component, Inject } from "@angular/core";
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialogModule,
    MatDialog
} from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ToastrService } from "ngx-toastr";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

export interface AddrecurringData {
    isEdit: boolean;
    recurring: any;
}

@Component({
    selector: "app-recurring",
    templateUrl: "./reccuring.component.html",
    styleUrls: ["./reccuring.component.scss"],
    standalone: true,
    imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        CommonModule,
        ReactiveFormsModule,
        MatSlideToggleModule
    ]
})
export class RecurringComponent {
    // @ts-ignore
    recurringForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<RecurringComponent>,
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: AddrecurringData
    ) { }

    ngOnInit() {
        this.recurringForm = this.formBuilder.group({
            no_of_rec: ["", [Validators.required]],
            date_of_rec: ["", [Validators.required]]
        });
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }




}
