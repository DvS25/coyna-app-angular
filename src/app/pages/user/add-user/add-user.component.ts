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
import { CustomRoleComponent } from "../custom-role/custom-role.component";

export interface AddUserData {
  isEdit: boolean;
  user: any;
}

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AddUserComponent {
  roles: any;
  // @ts-ignore
  userForm: FormGroup;

  isReadOnly: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private notification: ToastrService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: AddUserData
  ) {}

  ngOnInit() {
    this.getRoles();

    this.userForm = this.formBuilder.group({
      fullName: ["", [Validators.required]],
      emailAddress: ["", [Validators.required]],
      role: ["", [Validators.required]]
    });

    if (this.data.isEdit) {
      this.isReadOnly = true;
      this.userForm.setValue({
        fullName: this.data.user?.name,
        emailAddress: this.data.user?.emailId,
        role: this.data.user?.roleId
      });
    }
  }

  onRoleSelect(roleId: any) {
    if (roleId.value === "0") {
      const dialogRef = this.dialog.open(CustomRoleComponent, {
        width: "600px"
      });

      dialogRef.afterClosed().subscribe((result) => {});
    }
  }

  getRoles() {
    this.roles = [];
    this.userService.getRoles().subscribe((res) => {
      if (res.code == "1") {
        this.roles = res.results;
      }
    });
  }

  addUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    let userPayload = {
      userInfoId: this.data.isEdit ? this.data?.user?.userInfoId : "",
      name: this.userForm.value.fullName,
      emailId: this.userForm.value.emailAddress,
      roleId: this.userForm.value.role
    };

    this.userService
      .addUser(userPayload, this.data.isEdit, this.data?.user?.userInfoId)
      .subscribe((res) => {
        if (res.code == "1") {
          this.notification.success(res.message);
          this.dialogRef.close();
        }
      });
  }
}
