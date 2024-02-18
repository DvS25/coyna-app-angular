import { Component, Inject, ViewEncapsulation } from "@angular/core";
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
import { DepartmentService } from "../../../../../shared";
import { ToastrService } from "ngx-toastr";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

export interface AddDepartmentData {
  isEdit: boolean;
  department: any;
}

@Component({
  selector: "app-add-department",
  templateUrl: "./add-department.component.html",
  styleUrls: ["./add-department.component.scss"],
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
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class AddDepartmentComponent {
  // @ts-ignore
  departmentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddDepartmentComponent>,
    private departmentService: DepartmentService,
    private formBuilder: FormBuilder,
    private notification: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: AddDepartmentData
  ) {}

  ngOnInit() {
    this.departmentForm = this.formBuilder.group({
      departmentName: ["", [Validators.required]],
      isactive: null
    });

    if (this.data.isEdit) {
      this.departmentForm.setValue({
        departmentName: this.data.department.name,
        isactive: this.data.department.isactive
      });
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  addDepartment() {
    if (this.departmentForm.invalid) {
      this.departmentForm.markAllAsTouched();
      return;
    }

    let departmentPayload = {
      name: this.departmentForm.value.departmentName,
      isactive: this.departmentForm.value.isactive ? 1 : 0
    };

    this.departmentService
      .addDepartment(
        departmentPayload,
        this.data.isEdit,
        this.data.department?.departmentId
      )
      .subscribe((res) => {
        if (res.code == "1") {
          this.notification.success(res.message);
          this.dialogRef.close();
        }
      });
  }
}
