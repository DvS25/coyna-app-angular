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
import { MatSelectModule } from "@angular/material/select";
import { CompanyService, DepartmentService } from "src/app/shared";
import { ItemClassificationListComponent } from "src/app/pages/item-classification-list/item-classification-list.component"
import { DomSanitizer } from "@angular/platform-browser";

export interface ServiceData {
    isEdit: boolean;
    ServiceData: any;
}

@Component({
    selector: "app-new-service",
    templateUrl: "./new-service.component.html",
    styleUrls: ["./new-service.component.scss"],
    standalone: false,
})
export class ServiceComponent {
    // @ts-ignore
    ServiceForm: FormGroup;
    submitted = false;
    DepartmentList: any = [];
    IncomeAccountList: any = [];
    // @ts-ignore\
    uploader: FileUploader;
    image: any;

    constructor(
        private service: CompanyService,
        public dialogRef: MatDialogRef<ServiceComponent>,
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        private departmentService: DepartmentService,
        private companyService: CompanyService,
        private sanitizer: DomSanitizer,
        @Inject(MAT_DIALOG_DATA) public data: ServiceData
    ) { }

    ngOnInit() {
        this.ServiceForm = this.formBuilder.group({
            name: ["", [Validators.required]],
            departmentId: ["", [Validators.nullValidator]],
            price: ["", [Validators.nullValidator]],
            qtyInStock: ["", [Validators.nullValidator]],
            coaCompanyId: ["", [Validators.required]],
            service_image: ["", [Validators.nullValidator]],
        });
        // this.DownloadImage();
        this.GetDepartmentList();
        this.GetIncomeAccount();
        this.ServiceForm.patchValue(this.data);
    }

    GetDepartmentList() {
        this.departmentService.getDepartment().subscribe((res) => {
            if (res.code == "1") {
                this.DepartmentList = res.results;
            }
        });
    }

    GetIncomeAccount() {
        this.companyService.GetIncomeAccountList().subscribe((res) => {
            if (res.code == "1") {
                this.IncomeAccountList = res.results;
            }
        });
    }

    async onFileSelected(event: any) {
        const file: File = event[0];
        console.log(file);
        // let data = this.uploader?.queue;
        let formData = new FormData();
        formData.append("file", file);
        this.service.UploadCompanyLogo(formData).subscribe(
            res => {
                if (res.code == "1") {
                    this.notification.success(res.message);
                    this.DownloadImage();
                }
            }, error => {
            })
    }

    DownloadImage() {
        this.service.DownloadCompanyLogo().subscribe(
            async res => {
                let objectURL = URL.createObjectURL(res.body);
                this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            }, error => {
            })
    }

    SaveNewService(): void {
        if (this.ServiceForm.invalid) {
            return;
        }
        let data: any = {};
        data['itemType'] = "SERVICE";
        data['name'] = this.ServiceForm.value.name;
        data['price'] = this.ServiceForm.value.price;
        data['departmentId'] = this.ServiceForm.value.departmentId;
        data['qtyInStock'] = this.ServiceForm.value.qtyInStock;
        data['coaCompanyId'] = this.ServiceForm.value.coaCompanyId;
        this.service.AddService(data)
            .subscribe((res) => {
                if (res.code == '1') {
                    this.notification.success('Service created successfully');
                    this.dialogRef.close();
                    window.location.reload();
                }
            })
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

}
