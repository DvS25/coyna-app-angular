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
import { map, catchError, throwError, BehaviorSubject } from "rxjs";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
export interface AddCustomerData {
  isEdit: boolean;
  customer: any;
}

@Component({
  selector: "app-add-vendor",
  templateUrl: "./add-vendor.component.html",
  styleUrls: ["./add-vendor.component.scss"],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule
  ]
})
export class AddVendorComponent {
  accountTypes: any;
  EINTaxType: boolean = true;
  detailTypes: any;
  SSNTaxType: boolean = false;
  paymentTerms: any;
  countries: any;
  taxIdType: string = "EIN";
  states: any;
  cities: any;
  // @ts-ignore
  customerForm: FormGroup;
  progress: number = 0;
  constructor(
    public dialogRef: MatDialogRef<AddVendorComponent>,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private notification: ToastrService,
    private http: HttpClient,
    private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) public data: AddCustomerData
  ) {}

  ngOnInit() {
    this.getPaymentTerms();
    this.getCountries();
    this.customerForm = this.formBuilder.group({
      companyName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phoneNumber: ["", [Validators.required, Validators.pattern(/^\d{10}$/)]],
      website: ["", [Validators.required, Validators.pattern(/^https?:\/\/\S+\.\S+$/)]],
      address: ["", [Validators.required]],
      country: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      zipCode: ["", [Validators.required]],
      paymentTerm: ["", [Validators.required]],
      openingBalance: ["", [Validators.required]],
      taxidNumber: ["", [Validators.required]],
      asOf: ["", [Validators.required]]
    });

    this.editMode();
  }

  closePopup() {
    debugger
    this.dialogRef.close();
  }
  TaxIdTypeOnChange(Value: any) {
    return;
    let DD = this.SSNTaxType;
    if (Value == 'EIN') {
        this.SSNTaxType = false;
        this.EINTaxType = true;
        this.taxIdType = Value;
    }
    else {
        this.SSNTaxType = true;
        this.EINTaxType = false;
        this.taxIdType = Value;
    }
}

  editMode() {
    if (this.data.isEdit) {
      console.log("this.data = ", this.data);
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
        taxidNumber: this.data.customer.taxidNumber,
        openingBalance: this.data.customer.openingBal,
        asOf: this.data.customer.openBalDate
      });

      if (this.data.customer?.country) {
        this.getStates({value: this.data.customer?.country});
      }

      if (this.data.customer?.state) {
        this.getCities({value: this.data.customer?.state});
      }
    } 
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
            taxidNumber: this.data.customer.taxidNumber,
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

    let customerPayload: any = {
      // customerId: this.data.isEdit ? this.data.customer?.customerId : "",
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
      taxidNumber: this.customerForm.value.taxidNumber,
      openBalDate: new Date(this.customerForm.value.asOf).toISOString()
    };

    Object.keys(customerPayload).forEach((ele) => {
      if (ele !== "openingBal") {
        customerPayload[ele] = customerPayload[ele] + ""
      }
    })

    if (this.data.isEdit) {
      this.companyService
        .updateVendor(customerPayload, this.data.customer?.vendorId)
        .subscribe((res) => {
          if (res.code == "1") {
            this.notification.success(res.message);
            this.dialogRef.close();
          }
        });
    } else {
      this.companyService
        .addVendor(customerPayload)
        .subscribe((res) => {
          if (res.code == "1") {
            this.notification.success(res.message);
            this.dialogRef.close();
          }
        });
    }
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
}
