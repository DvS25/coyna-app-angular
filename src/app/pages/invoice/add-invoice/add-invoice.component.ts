import { Component, ViewChild } from "@angular/core";
import {
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "src/app/layouts/admin/admin.component";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { CustomerService } from "src/app/shared/service/apis/customer.service";
import {
  ChartOfAccountSetupService,
  CompanyService,
  DepartmentService,
  InvoiceManagementService
} from "src/app/shared";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { FileUploadModule, FileUploader } from "ng2-file-upload";
import { CustomIconModule } from "src/app/components/custom-icon/custom-icon.component";

@Component({
  selector: "app-add-invoice",
  templateUrl: "./add-invoice.component.html",
  styleUrls: ["./add-invoice.component.scss"],
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCardModule,
    MatDatepickerModule,
    CommonModule,
    ReactiveFormsModule,
    FileUploadModule,
    CustomIconModule,
    FormsModule
  ]
})
export class AddInvoiceComponent {
  files: any;
  entityId: any;
  transactionDate: any;
  amount: any;
  paymentInfo: any;
  dueDate: any;
  description: any;
  tnumber: any;
  email: any;
  accountName: any;
  totalAmt: any;

  categoryDetails: any = [];
  transactionDetails: any = [];
  items: any = [];
  customers: any = [];
  chartOfAccounts: any = [];
  paymentTerms: any = [];
  itemsList: any = [];
  departments: any = [];

  initalCategoryIndex = 0;
  initalItemIndex = 1;

  itemRowIndexValue: any;

  // @ts-ignore
  uploader: FileUploader;
  UploadedList: any = [];

  categoryColumns: string[] = [
    "no",
    "accountName",
    "description",
    "amount",
    "department",
    "action"
  ];

  itemColumns: string[] = [
    "no",
    "product",
    "description",
    "qty",
    "rate",
    "amount",
    "department",
    "action"
  ];

  @ViewChild(MatTable) categoryTable: MatTable<any> = this.categoryDetails;
  @ViewChild(MatTable) itemTable: MatTable<any> = this.items;

  constructor(
    private adminComponent: AdminComponent,
    private customerService: CustomerService,
    private chartOfAccountSetupService: ChartOfAccountSetupService,
    private companyService: CompanyService,
    private invoiceManagementService: InvoiceManagementService,
    private notification: ToastrService,
    private departmentService: DepartmentService
  ) {
    this.uploader = new FileUploader({
      url: String(
        `http://18.60.179.8:8080/payments-control-centre/v1/transaction-document/upload-base64?transactionCategory=INVOICE`
      ),
      disableMultipart: true,
      formatDataFunctionIsAsync: true,
      autoUpload: true,
      maxFileSize: 20 * 1024 * 1024,
      formatDataFunction: async (item: any) => {
        let Response = {
          fileBase64: await this.convertFileToBase64(item._file),
          documentName: item._file.name
        };
        this.invoiceManagementService.uploadInvoice(Response).subscribe(
          (res) => {
            if (res.code == "1") {
              item.documentId = res.results;
              this.UploadedList.push({
                transDocId: res.results,
                transactionId: this.transactionDetails.transactionId
              });
            }
          },
          (error) => {}
        );
      }
    });
  }

  ngOnInit() {
    this.adminComponent.SetTitle("Create New Invoice");

    // this.categoryForm = this.formBuilder.group({
    //   no: ["", [Validators.required]]
    // });

    // this.setCategoryData();
    this.setItemData();
    this.getCustomers();
    this.getChartOfAccounts();
    this.getPaymentTerms();
    this.getItems();
    this.getDepartments();
  }

  setCategoryData() {
    // this.categoryDetails = [];
    this.categoryDetails = [...this.categoryDetails];
    this.categoryDetails.push({
      no: "",
      coaCompanyId: "",
      description: "",
      amount: "",
      departmentId: ""
    });
    // for (var i = 0; i < this.initalCategoryIndex; i++) {
    //   this.categoryDetails.push({
    //     no: "",
    //     coaCompanyId: "",
    //     description: "",
    //     amount: "",
    //     departmentId: ""
    //   });
    // }
    this.categoryTable.renderRows;
  }

  setItemData() {
    // this.items = [];
    this.items = [...this.items];
    this.items.push({
      no: "",
      product: "",
      description: "",
      qty: "",
      rate: "",
      amount: "",
      department: "",
      action: ""
    });
    // for (var i = 0; i < this.initalItemIndex; i++) {
    //   this.items.push({
    //     no: "",
    //     product: "",
    //     description: "",
    //     qty: "",
    //     rate: "",
    //     amount: "",
    //     department: "",
    //     action: ""
    //   });
    // }
    this.itemTable.renderRows;
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((res) => {
      if (res.code == "1") {
        this.customers = res.results;
      }
    });
  }

  getChartOfAccounts() {
    this.chartOfAccountSetupService.getChartOfAccount().subscribe((res) => {
      if (res.code == "1") {
        this.chartOfAccounts = res.results;
      }
    });
  }

  getPaymentTerms() {
    this.companyService.getPaymentTermList().subscribe((res) => {
      if (res.code == "1") {
        this.paymentTerms = res.results;
      }
    });
  }

  getItems() {
    this.companyService.getItemLists().subscribe((res) => {
      if (res.code == "1") {
        this.itemsList = res.results;
      }
    });
  }

  getDepartments() {
    this.departmentService.getDepartment().subscribe((res) => {
      if (res.code == "1") {
        this.departments = res.results;
      }
    });
  }

  addCategoryRow() {
    // this.initalCategoryIndex++;
    this.setCategoryData();
  }

  deleteCategoryRow(index: any) {
    // this.initalCategoryIndex--;
    this.categoryDetails.splice(index, 1);
    this.categoryDetails = [...this.categoryDetails];
    this.categoryTable.renderRows;
  }

  addItemsRow() {
    // this.initalItemIndex++;
    this.setItemData();
  }

  deleteItemsRow(index: any) {
    this.items.splice(index, 1);
    this.items = [...this.items];
    this.itemTable.renderRows;
  }

  clearCategoryRow() {
    this.categoryDetails = [];
  }

  clearItemsRow() {
    this.items = [];
  }

  itemRowIndex(index: any) {
    this.itemRowIndexValue = index;
  }

  getTotalAmount() {
    const columnValues = this.items.map(
      (item: any) => item["qty"] * item["rate"]
    );
    const totalAmt = columnValues.reduce((a: any, b: any) => a + b);
    this.totalAmt = totalAmt;
    return totalAmt;
  }

  onDepartmentSelect(departmentId: any) {
    this.categoryDetails[this.itemRowIndexValue].departmentId =
      departmentId.value;
  }

  onItemSelect(itemId: any) {
    this.initalCategoryIndex++;
    // this.categoryDetails = [];
    // const value = this.categoryDetails.find((obj: any) => obj.coaCompanyId === coaCompanyId.value);
    const itemCount = this.items.filter(
      (obj: any) => obj.product === itemId.value
    ).length;

    if (itemCount == 1) {
      const itemObj = this.itemsList.find(
        (obj: any) => obj.itemId === itemId.value
      );
      const itemIndex = this.itemsList.findIndex(
        (obj: any) => obj.itemId === itemId.value
      );
      this.categoryDetails[this.itemRowIndexValue] = {
        no: "",
        coaCompanyId: itemObj.coaCompanyId,
        description: "",
        amount: "",
        departmentId: ""
      };
      // this.categoryDetails.push({
      //   no: '',
      //   coaCompanyId: itemObj.coaCompanyId,
      //   description: "",
      //   amount: "",
      //   departmentId: ""
      // })
      this.categoryDetails = [...this.categoryDetails];
      this.categoryTable.renderRows;
    } else {
      this.items.splice(this.itemRowIndexValue, 1);
      this.items = [...this.items];
      this.itemTable.renderRows;
    }

    // this.initalCategoryIndex++;
    // this.setCategoryData();
  }

  saveInvoice() {
    this.transactionDetails = [];
    for (var i = 0; i < this.categoryDetails.length; i++) {
      for (var j = 0; j < this.items.length; j++) {
        const itemObj = this.itemsList.find(
          (obj: any) => obj.itemId === this.items[j].product
        );
        if (this.categoryDetails[i].coaCompanyId === itemObj.coaCompanyId) {
          let transAssociation = {
            itemId: this.items[j].product,
            qty: this.items[j].qty,
            rate: this.items[j].rate,
            description: this.items[j].description
          };
          let transactionDetail = {
            coaCompanyId: this.categoryDetails[i].coaCompanyId,
            amount: this.items[j].qty * this.items[j].rate,
            description: this.categoryDetails[i].description,
            departmentId: this.categoryDetails[i].departmentId,
            transAssociation: transAssociation
          };

          this.transactionDetails.push(transactionDetail);
          break;
        }
      }
    }

    let invoicePayload = {
      // id: this.data.isEdit ? this.data.id : "",
      entityId: this.entityId,
      transactionDate: this.transactionDate.toISOString(),
      amount: this.totalAmt,
      paymentInfo: this.paymentInfo,
      dueDate: this.dueDate.toISOString(),
      description: this.description,
      tnumber: this.tnumber,
      transactionDetails: this.transactionDetails
    };

    this.invoiceManagementService
      .addInvoice(invoicePayload)
      .subscribe((res) => {
        if (res.code == "1") {
          this.notification.success(res.message);
          if (this.UploadedList.length > 0) {
            this.UploadedList.map(
              (o: { transactionId: any }) => (o.transactionId = res.results)
            );
            this.UpdateDocument(this.UploadedList);
          }
        }
      });
  }

  UpdateDocument(data: any) {
    this.invoiceManagementService.updateDocumentInvoice(data).subscribe(
      (res) => {
        if (res.code == "1") {
          this.notification.success(res.message);
        }
      },
      (error) => {}
    );
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
    this.invoiceManagementService.downloadDocumentInvoiceItem(id).subscribe(
      (res) => {
        this.downloadAsBlob(res, fileName);
      },
      (error) => {}
    );
  }

  downloadAsBlob(response: any, fileName: any) {
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(response.body);
    link.download = fileName;
    link.click();
  }

  DeleteDocument(id: any, item: any) {
    this.invoiceManagementService.deleteDocumentInvoiceItem(id).subscribe(
      (res) => {
        if (res.code == "1") {
          item.remove();
          if (this.transactionDetails.transactionId) {
            this.UploadedList.pop(
              (o: { transDocId: any }) => o.transDocId == id
            );
          }
          this.notification.success(res.message);
        }
      },
      (error) => {}
    );
  }
}
