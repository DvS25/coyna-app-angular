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
import { FileUploadModule, FileUploader } from 'ng2-file-upload';
import { DomSanitizer } from "@angular/platform-browser";

export interface ProductData {
    isEdit: boolean;
    ProductData: any;
}

@Component({
    selector: "app-new-product-service",
    templateUrl: "./new-product.component.html",
    styleUrls: ["./new-product.component.scss"],
    standalone: false,
})
export class ProductComponent {
    // @ts-ignore
    ProductForm: FormGroup;
    submitted = false;
    ProductData: any;
    DepartmentList: any = [];
    IncomeAccountList: any = [];
    // @ts-ignore\
    uploader: FileUploader;
    image: any;

    constructor(
        private service: CompanyService,
        public dialogRef: MatDialogRef<ProductComponent>,
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        private departmentService: DepartmentService,
        private companyService: CompanyService,
        private sanitizer: DomSanitizer,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
        this.ProductForm = this.formBuilder.group({
            name: ["", [Validators.required]],
            sku: ["", [Validators.nullValidator]],
            departmentId: ["", [Validators.nullValidator]],
            description: ["", [Validators.nullValidator]],
            price: ["", [Validators.nullValidator]],
            qtyInStock: ["", [Validators.nullValidator]],
            coaCompanyId: ["", [Validators.required]],
            product_image: ["", [Validators.nullValidator]],
        });
        this.DownloadImage();
        this.GetDepartmentList();
        this.GetIncomeAccount();
        this.ProductForm.patchValue(this.data);
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

    SaveNewProduct(): void {
        if (this.ProductForm.invalid) {
            return;
        }
        debugger
        let data: any = {};
        data['itemType'] = "PRODUCT";
        data['name'] = this.ProductForm.value.name;
        data['price'] = this.ProductForm.value.price;
        data['qtyInStock'] = this.ProductForm.value.qtyInStock;
        data['departmentId'] = this.ProductForm.value.departmentId;
        data['coaCompanyId'] = this.ProductForm.value.coaCompanyId;
        this.service.AddProduct(data)
            .subscribe((res) => {
                if (res.code == '1') {
                    this.notification.success('Product created successfully');
                    this.dialogRef.close();
                    window.location.reload();
                }
            })
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }




}