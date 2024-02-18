import { Component, Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
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
import { MatDatepickerModule } from "@angular/material/datepicker";
import { CustomerService } from "src/app/shared/service/apis/customer.service";
import { CompanyService } from "src/app/shared";
import {
  HttpClient,
  HttpEventType,
  HttpErrorResponse
} from "@angular/common/http";
import { map, catchError, throwError } from "rxjs";
import { FileUploadModule, FileUploader } from "ng2-file-upload";
import { CustomIconModule } from "src/app/components/custom-icon/custom-icon.component";
export interface AddCustomerData {
  isEdit: boolean;
  customer: any;
}

@Component({
  selector: "app-add-customer",
  templateUrl: "./add-customer.component.html",
  styleUrls: ["./add-customer.component.scss"],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    FileUploadModule,
    CustomIconModule,
    MatDatepickerModule
  ]
})
export class AddCustomerComponent {
  accountTypes: any;
  detailTypes: any;
  paymentTerms: any;
  countries: any;
  states: any;
  cities: any;
  // @ts-ignore
  customerForm: FormGroup;
  progress: number = 0;
  files: any;

  // @ts-ignore
  uploader: FileUploader;
  UploadedList: any = [];
  transactionDetails: any = [];

  constructor(
    public dialogRef: MatDialogRef<AddCustomerComponent>,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private notification: ToastrService,
    private http: HttpClient,
    private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) public data: AddCustomerData
  ) {
    this.uploader = new FileUploader({
      url: String(`http://18.60.179.8:8080/payments-control-centre/v1/transaction-document/upload-base64?transactionCategory=CUSTOMER`),
      disableMultipart: true,
      formatDataFunctionIsAsync: true,
      autoUpload: true,
      maxFileSize: 20 * 1024 * 1024,
      formatDataFunction: async (item: any) => {
          let Response = {
              fileBase64: await this.convertFileToBase64(item._file),
              documentName: item._file.name
          }
          this.customerService.uploadInvoice(Response).subscribe(
              res => {
                  if (res.code == "1") {
                      item.documentId = res.results;
                      this.UploadedList.push({ transDocId: res.results, transactionId: this.transactionDetails.transactionId });
                  }
              }, error => {
              })
      }
  });
  }

  ngOnInit() {
    this.getPaymentTerms();
    this.getCountries();

    this.customerForm = this.formBuilder.group({
      companyName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      website: ["", [Validators.required]],
      address: ["", [Validators.required]],
      country: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      zipCode: ["", [Validators.required]],
      paymentTerm: ["", [Validators.required]],
      openingBalance: ["", [Validators.required]],
      asOf: ["", [Validators.required]]
    });
  }

  getPaymentTerms() {
    this.companyService.getPaymentTermList().subscribe((res) => {
      if (res.code == "1") {
        this.paymentTerms = res.results;

        if (this.data.isEdit) {
          this.customerForm.setValue({
            companyName: this.data.customer.name,
            email: this.data.customer.emailId,
            phoneNumber: this.data.customer.contactNumber,
            website: this.data.customer.website,
            address: this.data.customer.address,
            country: this.data.customer?.country,
            city: this.data.customer.city,
            state: this.data.customer.state,
            zipCode: this.data.customer.zipcode,
            paymentTerm: this.data.customer.paymentTerm,
            openingBalance: this.data.customer.openingBal,
            asOf: this.data.customer.openBalDate
          });
        }
      }
    });
  }

  getCountries() {
    this.companyService.getV1Country().subscribe((res) => {
      if (res.code == "1") {
        this.countries = res.results;
      }
    });
  }

  getStates(countryId: any) {
    this.companyService.getV1State(countryId.value).subscribe((res) => {
      if (res.code == "1") {
        this.states = res.results;
      }
    });
  }

  getCities(stateId: any) {
    this.companyService.getV1City(stateId.value).subscribe((res) => {
      if (res.code == "1") {
        this.cities = res.results;
      }
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  addCustomer() {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    let customerPayload = {
      customerId: this.data.isEdit ? this.data.customer?.customerId : "",
      name: this.customerForm.value.companyName,
      emailId: this.customerForm.value.email,
      contactNumber: this.customerForm.value.phoneNumber,
      website: this.customerForm.value.website,
      address: this.customerForm.value.address,
      country: this.customerForm.value.country,
      city: this.customerForm.value.city,
      state: this.customerForm.value.state,
      zipcode: this.customerForm.value.zipCode,
      paymentTerm: this.customerForm.value.paymentTerm,
      openingBal: this.customerForm.value.openingBalance,
      openBalDate: this.customerForm.value.asOf
    };

    this.customerService
      .createCustomer(customerPayload, this.data.isEdit)
      .subscribe((res) => {
        if (res.code == "1") {
          this.notification.success(res.message);
          this.dialogRef.close();
        }
      });
  }

  // upload(file: any) {
  //   this.progress = 10;
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   this.http
  //     .post("your-url-here", formData, {
  //       reportProgress: true,
  //       observe: "events"
  //     })
  //     .pipe(
  //       map((event: any) => {
  //         if (event.type == HttpEventType.UploadProgress) {
  //           this.progress = Math.round((100 / event.total) * event.loaded);
  //         } else if (event.type == HttpEventType.Response) {
  //           // this.progress = null;
  //         }
  //       }),
  //       catchError((err: any) => {
  //         // this.progress = null;
  //         alert(err.message);
  //         return throwError(err.message);
  //       })
  //     )
  //     // .toPromise();
  // }

  // selectFile() {
  //   const input = document.createElement('input');
  //   input.type = 'file';
  //   input.multiple = true
  //   input.click();
  //   this.progress = 30;
  //   const formData = new FormData();
  //   input.addEventListener('change', event => {
  //     // event.target.files[0];
  //     this.http
  //     .post("your-url-here", formData, {
  //       reportProgress: true,
  //       observe: "events"
  //     })
  //     .pipe(
  //       map((event: any) => {
  //         if (event.type == HttpEventType.UploadProgress) {
  //           this.progress = Math.round((100 / event.total) * event.loaded);
  //         } else if (event.type == HttpEventType.Response) {
  //           // this.progress = null;
  //         }
  //       }),
  //       catchError((err: any) => {
  //         // this.progress = null;
  //         alert(err.message);
  //         return throwError(err.message);
  //       })
  //     )
  //   });
  // }

  UpdateDocument(data: any) {
    this.customerService.updateDocumentInvoice(data).subscribe(
        res => {
            if (res.code == "1") {
                this.notification.success(res.message);

            }
        }, error => {
        })
  }

  async convertFileToBase64(file: File) {
    let result_base64 = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.readAsDataURL(file);
    });
    return result_base64;
}

async onFileSelected(event: any) {
  const file: File = event[0];
  console.log(file);
  let data = this.uploader?.queue;
  this.files = data[0].file.name;
}

DownloadDocument(id: any, fileName: any) {
  this.customerService.downloadDocumentInvoiceItem(id).subscribe(
      res => {
          this.downloadAsBlob(res, fileName);
      }, error => {
      })
}

downloadAsBlob(response: any, fileName: any) {
  var link = document.createElement('a');
  link.href = window.URL.createObjectURL(response.body);
  link.download = fileName;
  link.click();
}

DeleteDocument(id: any, item: any) {
  this.customerService.deleteDocumentInvoiceItem(id).subscribe(
      res => {
          if (res.code == "1") {
              item.remove();
              if (this.transactionDetails.transactionId) {
                  this.UploadedList.pop((o: { transDocId: any; }) => o.transDocId == id);
              }
              this.notification.success(res.message);

          }
      }, error => {
      })
}
}
