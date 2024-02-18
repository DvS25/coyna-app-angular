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

export interface ProductOrServiceData {
    isEdit: boolean;
    ProductOrServiceData: any;
}

@Component({
    selector: "app-product-service",
    templateUrl: "./product-service.component.html",
    styleUrls: ["./product-service.component.scss"],
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
export class ProductOrServiceComponent {
    // @ts-ignore
    ProductOrServiceForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<ProductOrServiceComponent>,
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: ProductOrServiceData
    ) { }

    ngOnInit() {
        this.ProductOrServiceForm = this.formBuilder.group({
            product: ["", [Validators.required]],
            service: ["", [Validators.required]]
        });
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }




}
