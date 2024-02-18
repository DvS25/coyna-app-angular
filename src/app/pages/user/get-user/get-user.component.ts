import { Component } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "src/app/shared";
import { CommonModule } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { AdminComponent } from "src/app/layouts/admin/admin.component";
import { AddUserComponent } from "../add-user/add-user.component";

@Component({
  selector: "app-get-user",
  templateUrl: "./get-user.component.html",
  styleUrls: ["./get-user.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    CommonModule
  ]
})
export class GetUserComponent {
  users: any;

  displayedColumns: string[] = ["userName", "email", "role", "action"];

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private notification: ToastrService,
    private adminComponent: AdminComponent
  ) {}

  ngOnInit() {
    this.adminComponent.SetTitle("Users");
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      if (res.code == "1") {
        this.users = res.results;
      }
    });
  }

  addOrEditUser(isEdit: boolean, user?: any): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      data: { isEdit: isEdit, user: user },
      width: "450px"
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getUsers();
    });
  }

  deleteUser(user?: any): void {
    this.userService.deleteUser(user?.userInfoId).subscribe((res) => {
      if (res.code === "1") {
        this.notification.success(res.message);
        this.getUsers();
      }
    });
  }

  reInviteUser(user?: any) {
    let reInviteUserPayload = {
      userInfoId: user?.userInfoId
    };

    this.userService.reInviteUser(reInviteUserPayload).subscribe((res) => {
      if (res.code == "1") {
        this.notification.success(res.message);
      }
    });
  }
}
