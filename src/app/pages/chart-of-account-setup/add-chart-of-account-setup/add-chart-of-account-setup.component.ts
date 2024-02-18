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
import { ChartOfAccountSetupService } from "../../../shared";
import { ToastrService } from "ngx-toastr";

export interface AddCoaData {
  isEdit: boolean;
  id: string;
}

@Component({
  selector: "app-add-chart-of-account-setup",
  templateUrl: "./add-chart-of-account-setup.component.html",
  styleUrls: ["./add-chart-of-account-setup.component.scss"],
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

export class AddChartOfAccountSetupComponent {
  accountTypes: any;
  detailTypes: any;
  // @ts-ignore
  coaForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddChartOfAccountSetupComponent>,
    private chartOfAccountSetupService: ChartOfAccountSetupService,
    private formBuilder: FormBuilder,
    private notification: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: AddCoaData,
  ) {}

  ngOnInit() {
    this.getAccountType();

    if(this.data.isEdit){
      this.getChartOfAccountById()
    }

    this.coaForm = this.formBuilder.group({
      accountNumber: ["", [Validators.required]],
      accountName: ["", [Validators.required]],
      accountType: ["", [Validators.required]],
      detailType: ["", [Validators.required]]
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  getAccountType() {
    this.chartOfAccountSetupService.getAccountType().subscribe((res) => {
      if (res.code == "1") {
        this.accountTypes = res.results;
      }
    });
  }

  getDetailType(coaTypeId: any) {
    this.detailTypes = [];
    this.chartOfAccountSetupService
      .getDetailType(coaTypeId?.value ? coaTypeId?.value : coaTypeId)
      .subscribe((res) => {
        if (res.code == "1") {
          this.detailTypes = res.results;
        }
      });
  }

  getChartOfAccountById() { 
    this.chartOfAccountSetupService.getChartOfAccountById(this.data.id).subscribe((res) => {
      if (res.code == "1") {
        const val = res.results;
        this.getDetailType(val.coaTypeParentId);
        this.coaForm.setValue({
          accountNumber: val.coaCode,
          accountName: val.coaName,
          accountType: val.coaTypeParentId,
          detailType: val.coaTypeId
      })
      }
    });
  }

  addChartOfAccount() {
    if (this.coaForm.invalid) {
      this.coaForm.markAllAsTouched();
      return;
    }

    let coaPayload = [
      {
        id: this.data.isEdit ? this.data.id : "",
        coaCode: this.coaForm.value.accountNumber,
        coaName: this.coaForm.value.accountName,
        coaTypeId: this.coaForm.value.detailType
      }
    ];
    this.chartOfAccountSetupService.addCoa(coaPayload, this.data.isEdit).subscribe((res) => {
      if (res.code == "1") {
        this.notification.success(res.message);
        this.dialogRef.close();
      }
    });
  }
}
