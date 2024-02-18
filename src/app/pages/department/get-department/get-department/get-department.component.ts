import { Component, ViewEncapsulation } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { MatDialog } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { DepartmentService } from "src/app/shared";
import { AddDepartmentComponent } from "../add-department/add-department/add-department.component";
import { MatButtonModule } from "@angular/material/button";
import { AdminComponent } from "src/app/layouts/admin/admin.component";

@Component({
  selector: "app-get-department",
  templateUrl: "./get-department.component.html",
  styleUrls: ["./get-department.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    CommonModule,
    MatButtonModule
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class GetDepartmentComponent {
  departments: any;

  displayedColumns: string[] = ["departmentName", "status", "action"];

  constructor(
    private dialog: MatDialog,
    private departmentService: DepartmentService,
    private notification: ToastrService,
    private adminComponent: AdminComponent,
  ) {}

  ngOnInit() {
    this.adminComponent.SetTitle('Department');
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartment().subscribe((res) => {
      if (res.code == "1") {
        this.departments = res.results;
      }
    });
  }

  addOrEditDepartment(isEdit: boolean, department?: any): void {
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      data: { isEdit: isEdit, department: department },
      width: "950px"
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getDepartments();
    });
  }
}
