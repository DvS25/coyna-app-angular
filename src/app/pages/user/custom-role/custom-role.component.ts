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
import { UserService } from "../../../shared";
import { ToastrService } from "ngx-toastr";
import { MatCheckboxModule } from "@angular/material/checkbox";

@Component({
  selector: "app-custom-role",
  templateUrl: "./custom-role.component.html",
  styleUrls: ["./custom-role.component.scss"],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ]
})
export class CustomRoleComponent {
  // @ts-ignore
  customRoleForm: FormGroup;

  roleSelected: any = [];

  expenseChecked = false;

  constructor(
    public dialogRef: MatDialogRef<CustomRoleComponent>,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private notification: ToastrService
  ) {}

  ngOnInit() {
    this.customRoleForm = this.formBuilder.group({
      customRole: ["", [Validators.required]],
      initializationChecked: null,
      expensesChecked: null,
      dashboardChecked: null,
      incomesChecked: null,
      createNewChecked: null,
      reportsChecked: null,
      bankingChecked: null,
      settingChecked: null
    });
  }

  onSave() {
    if (this.customRoleForm.invalid) {
      this.customRoleForm.markAllAsTouched();
      return;
    }

    if (this.customRoleForm.value.initializationChecked) {
      this.roleSelected.push("Initialization");
    }

    if (this.customRoleForm.value.expensesChecked) {
      this.roleSelected.push("Expenses");
    }

    if (this.customRoleForm.value.dashboardChecked) {
      this.roleSelected.push("Dashboard");
    }

    if (this.customRoleForm.value.incomesChecked) {
      this.roleSelected.push("Incomes");
    }

    if (this.customRoleForm.value.createNewChecked) {
      this.roleSelected.push("Create New");
    }

    if (this.customRoleForm.value.reportsChecked) {
      this.roleSelected.push("Reports");
    }

    if (this.customRoleForm.value.bankingChecked) {
      this.roleSelected.push("Banking");
    }

    if (this.customRoleForm.value.settingChecked) {
      this.roleSelected.push("Setting");
    }

    let customeRolePayload = {
      roleName: this.customRoleForm.value.customRole,
      moduleNames: this.roleSelected
    };

    this.userService.addCustomRole(customeRolePayload).subscribe((res) => {
      if (res.code == "1") {
        this.notification.success(res.message);
        this.dialogRef.close();
      }
    });
  }
}
