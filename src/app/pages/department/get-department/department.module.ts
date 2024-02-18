import { NgModule } from "@angular/core";
import { DepartmentService } from "../../../shared";
import { CommonModule } from "@angular/common";
import { AddDepartmentComponent } from "./add-department/add-department/add-department.component";

@NgModule({
  declarations: [AddDepartmentComponent],
  imports: [CommonModule],
  providers: [DepartmentService]
})
export class DepartmentModule {}
