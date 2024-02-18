import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { BrowserDB, CompanyService, UtilityHelper } from "../../shared";
import { ActivatedRoute, Router } from "@angular/router";
import { SelectionModel } from '@angular/cdk/collections';
import { AdminComponent } from 'src/app/layouts/admin/admin.component';
import { VendorExpenseService } from 'src/app/shared/service/apis/vendor-expense.service';
import { FileUploader } from 'ng2-file-upload';
import { BillService } from 'src/app/shared/service/apis/bills.service';

export interface PeriodicElement {
    date: string;
    type: string;
    number: string;
    vendor: string;
    category: string;
    description: string;
    amount: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { date: "28-Aug-2023", type: "Expense", number: "456", vendor: "Router Work inc", category: "Shopify", description: "Sales form", amount: "$102.00" },
    { date: "28-Aug-2023", type: "Expense", number: "457", vendor: "Precision Pro", category: "Shopify", description: "Sales form", amount: "$45.00" },
    { date: "29-Aug-2023", type: "Expense", number: "458", vendor: "CNC Creation", category: "Shopify", description: "Sales form", amount: "$1878.50" },
    { date: "29-Aug-2023", type: "Expense", number: "459", vendor: "CNC Innovation", category: "Shopify", description: "Sales form", amount: "$855.50" },
    { date: "30-Aug-2023", type: "Expense", number: "460", vendor: "Mill Master", category: "Shopify", description: "Sales form", amount: "$1050.00" },
    { date: "30-Aug-2023", type: "Expense", number: "460", vendor: "Mill Master", category: "Shopify", description: "Sales form", amount: "$1050.00" },
    { date: "30-Aug-2023", type: "Expense", number: "460", vendor: "Mill Master", category: "Shopify", description: "Sales form", amount: "$1050.00" },
    { date: "28-Aug-2023", type: "Expense", number: "456", vendor: "Router Work inc", category: "Shopify", description: "Sales form", amount: "$102.00" },
    { date: "28-Aug-2023", type: "Expense", number: "457", vendor: "Precision Pro", category: "Shopify", description: "Sales form", amount: "$45.00" },
    { date: "29-Aug-2023", type: "Expense", number: "458", vendor: "CNC Creation", category: "Shopify", description: "Sales form", amount: "$1878.50" },
    { date: "29-Aug-2023", type: "Expense", number: "459", vendor: "CNC Innovation", category: "Shopify", description: "Sales form", amount: "$855.50" },
    { date: "30-Aug-2023", type: "Expense", number: "460", vendor: "Mill Master", category: "Shopify", description: "Sales form", amount: "$1050.00" },
]

/**
 * @title Table with pagination
 */
@Component({
    selector: 'app-add-bills',
    templateUrl: './add-bills.component.html',
    styleUrls: ['./add-bills.component.scss']
})
export class AddBillsComponent {
    uploader: FileUploader;
    department: any[] = [];
    vendorlist: any[] = [];
    options: any[] = [];
    items: any[] = [];
    response: any;
    formData: any = {};
    JournalData: any = {};
    files: any;
    UploadedList: any = [];
    grandTotal: number = 0;
    transactionDetails: any = [];
    // categoryDetailForAccnameList: any[] = [
    // ];
    categoryDetailListOld: any[] = [];
    categoryDetailList: any[] = [
        // { accountName: 'Shopify Clearing', description: 'Sales form 2023-8-239reduce....', amount: '$15', department: '03' },
        // { accountName: 'Savannah Nguyen', description: 'Sales form 2023-8-239reduce....', amount: '$19', department: '01' },
    ];

    itemClassificationList: any[] = [
        // { product: 'Commission', description: 'Sales form 2023-8-239reduce....', qty: '20', rate: '$5', amount: '$100', department: '03' },
        // { product: 'Hours', description: 'Sales form 2023-8-239reduce....', qty: '10', rate: '$7', amount: '$70', department: '01' },
    ];
    billId!: string | null;

    ngAfterViewInit() {

    }

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private companyService: CompanyService,
        private notification: ToastrService,
        private router: Router,
        private utility: UtilityHelper,
        private billService: BillService,
        private AdminComponent: AdminComponent,
        private activatedRoute: ActivatedRoute,
        private vendorService: VendorExpenseService
    ) {
        this.uploader = new FileUploader({
            url: String(`http://18.60.179.8:8080/payments-control-centre/v1/transaction-document/upload-base64?transactionCategoryEnum=JOURNAL_ENTRY`),
            disableMultipart: true,
            formatDataFunctionIsAsync: true,
            autoUpload: true,
            maxFileSize: 20 * 1024 * 1024,
            formatDataFunction: async (item: any) => {
                let Response = {
                    fileBase64: await this.convertFileToBase64(item._file),
                    documentName: item._file.name
                }
                this.vendorService.uploadJournalEntry(Response).subscribe(
                    res => {
                        if (res.code == "1") {
                            item.documentId = res.results;
                            this.UploadedList.push({ transDocId: res.results, transactionId: this.JournalData.transactionId });
                        }
                    }, error => {
                    })
            }
        });
    }

    async convertFileToBase64(file: File) {
        let result_base64 = await new Promise((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = (e) => resolve(fileReader.result);
            fileReader.readAsDataURL(file);
        });
        return result_base64;
    }



    ngOnInit(): void {
        this.getVendorData();
        this.getDropdown();
        this.getitems();
        this.getDropdownDepartment();
        this.AdminComponent.SetTitle('Bill');
        this.billId = this.activatedRoute.snapshot.paramMap.get('id');
        // this.categoryDetailListOld = JSON.parse(JSON.stringify(this.categoryDetailForAccnameList));
        console.log(typeof (this.billId))
    }

    public getVendorData() {
        this.vendorService.getVendorExpenses().subscribe((vendorlist => {
            this.vendorlist = vendorlist.results;
        }));
    }

    public getDropdown() {
        this.vendorService.getPaymentAccountExpenses().subscribe((options => {
            this.options = options.results;
        }));
    }

    public getDropdownDepartment() {
        this.vendorService.getDepartmentExpenses().subscribe((department => {
            this.department = department.results;
        }));
    }

    public getitems() {
        this.vendorService.getitemsExpenses().subscribe((items => {
            this.items = items.results;
        }));
    }

    deleteRow(obj: any, isCategory: boolean) {
        if (isCategory) {
            let index: number = this.categoryDetailList.findIndex(a => a === obj);
            if (index != -1) {
                this.categoryDetailList.splice(index, 1);
            }
        } else {
            let index: number = this.itemClassificationList.findIndex(a => a === obj);
            if (index != -1) {
                this.itemClassificationList.splice(index, 1);
            }
        }
    }
    setCategory(uid: any, ind: any) {
        const u = this.items.find((ele: any) => (ele.itemId === uid));
        console.log(this.itemClassificationList[ind], ind)
        ind = this.itemClassificationList[ind]?.catIndex || ind
        if (u != null && u != undefined && u.coaCompanyId != null && u.coaCompanyId != '') {
            this.categoryDetailList[ind].coaCompanyId = u.coaCompanyId;
        }
        this.categoryDetailList[ind].coaCompanyId = "";
        let dropDownData = this.options.find((data: any) => data.id === u.coaCompanyId);
        if (dropDownData) {
            this.categoryDetailList[ind].coaCompanyId = dropDownData.id;
            this.categoryDetailList[ind].disabled = this.categoryDetailList[ind].autoAdded = true;
        } else {
            this.categoryDetailList[ind].disabled = this.categoryDetailList[ind].autoAdded = false;
        }
    }

    setDepartment(uid: any, ind: any) {
        const u = this.department.find((ele: any) => (ele.departmentId === uid));

        ind = this.itemClassificationList[ind]?.catIndex || ind
        this.categoryDetailList[ind].department = u.departmentId
    }

    clearCategoryTbl() {
        const objectsNotInOldArray = this.categoryDetailList.filter((newObj) => {
            console.log("this.categoryDetailListOld = ", this.categoryDetailListOld);
            return !this.categoryDetailListOld.some((oldObj) => oldObj.id === newObj.id);
        });
        if (objectsNotInOldArray && objectsNotInOldArray.length > 0) {
            objectsNotInOldArray.forEach(item => {

                let index: number = this.categoryDetailList.findIndex(a => a === item);
                if (index != -1) {
                    if (!this.categoryDetailList[index].disable) {
                        console.log("removing = ", this.categoryDetailList[index])
                        this.categoryDetailList.splice(index, 1);
                    }
                }
            });
        }
    }
    async onFileSelected(event: any) {
        const file: File = event[0];
        console.log(file);
        let data = this.uploader?.queue;
        this.files = data[0].file.name;
    }

    addTblData(isCategory: boolean) {
        if (isCategory) {
            let indexForId = this.categoryDetailList.length + 1
            if (this.categoryDetailList.some(x => x.coaCompanyId == '' || x.description == '')) {
                this.notification.error('To insert new row first fillout previously added empty ones.');
            }
            else {
                this.categoryDetailList.push({
                    id: indexForId, coaCompanyId: '', disable: false,
                    accountName: '', description: '', amount: '', department: ''
                });
            }
        }
        else {
            let indexForId = this.itemClassificationList.length + 1
            if (this.itemClassificationList.some(x => x.accountName == '' || x.description == '')) {
                this.notification.error('To insert new row first fillout previously added empty ones.');
            }
            else {
                this.categoryDetailList.push({
                    id: indexForId, coaCompanyId: '',
                    autoAdded: true,
                    disable: true,
                    accountName: '', description: '', amount: '0', department: ''
                });
                console.log("Setting valye = ", this.categoryDetailList.length - 1);
                this.itemClassificationList.push({
                    id: indexForId, product: '',
                    catIndex: this.categoryDetailList.length - 1,
                    autoAdded: true,
                    disable: true,
                    description: '', qty: '', amount: '', department: '', rate: ''
                });
            }
        }
    }
    clearItemTblData() {
        console.log("this.categoryDetailList = ", this.categoryDetailList);
        this.categoryDetailList = this.categoryDetailList.filter(item => !item.autoAdded);
        this.itemClassificationList = [];
    }


    calculateGrandTotal() {
        let sum = 0;
        this.categoryDetailList.forEach(item => {
            sum += item["amount"] ?? 0;
        });
        this.grandTotal = sum;
    }

    itemFieldChange(index: any, fieldKey: any) {
        // index = index + 1
        console.log("index = ", index);
        this.itemClassificationList[index].amount = this.itemClassificationList[index].qty * this.itemClassificationList[index].rate
        const catIndex = this.itemClassificationList[index].catIndex
        if (this.categoryDetailList[catIndex]) {
            this.categoryDetailList[catIndex].amount = this.itemClassificationList[index].amount
        }
        this.calculateGrandTotal();
    }



    onSubmit(): void {

        const formData = JSON.parse(JSON.stringify(this.formData))

        console.log("vendorId.entityId =", formData, this.categoryDetailList, this.itemClassificationList);

        const temp: any = {};
        this.itemClassificationList.forEach((ele: any) => {
            ele.product = this.items.find((ele2) => (ele2.itemId === ele.product))
            temp[ele?.product?.coaCompanyId] = temp[ele?.product?.coaCompanyId] || []
            temp[ele?.product?.coaCompanyId].push(ele);
        })

        let payLoad = {
            companyId: formData.entityId,
            entityId: formData.entityId,
            transactionDate: formData.transactionDate,
            amount: formData.totalAmt,
            paymentInfo: formData.paymentInfo,
            dueDate: formData.dueDate,
            description: formData.description,
            tnumber: formData.tnumber,
            transactionDetails: this.categoryDetailList.map((ele: any) => {

                ele.coaCompanyId = this.options.find((item) => (ele?.coaCompanyId === item.id))
                let transAssociation: any = null;
                if (temp[ele?.coaCompanyId?.id]?.length) {
                    transAssociation = {};
                    const tempEle = temp[ele?.coaCompanyId?.id][0];
                    transAssociation.itemId = tempEle?.product?.itemId;
                    transAssociation.qty = tempEle?.qty;
                    transAssociation.rate = tempEle?.rate;
                    transAssociation.description = tempEle?.description;
                    transAssociation.departmentId = tempEle?.departmentId || tempEle?.department;
                    transAssociation.transactionDtlId = tempEle?.transactionDtlId

                }
                const t2: any = {
                    coaCompanyId: ele?.coaCompanyId?.id,
                    amount: ele.amount,
                    description: ele.description,
                    departmentId: ele?.department,
                }
                if (transAssociation) {
                    t2.transAssociation = transAssociation;
                }

                if (this.billId !== "0") {
                    t2.transactionDtlId = ele.transactionDtlId
                }

                return t2;
            }),
        }

        const postData = {
        };
        if (!this.billId) {
            this.billService.addBill(payLoad).subscribe((data) => {
                this.response = data;
                this.notification.success("Saved Successfully!");
                this.router.navigate(['/bills']);
            });
        } else {
            this.billService.updateBill(this.billId, payLoad).subscribe((data) => {
                this.notification.success("Updated Successfully!");
                this.router.navigate(['/bills']);
                this.response = data;
            });
        }

        // this.billService
        //     .addBill(payLoad)
        //     .subscribe((res) => {
        //         if (res.code == "1") {
        //             this.notification.success(res.message);
        //             if (this.UploadedList.length > 0) {
        //                 this.UploadedList.map(
        //                     (o: { transactionId: any }) => (o.transactionId = res.results)
        //                 );
        //                 this.UpdateDocument(this.UploadedList);
        //             }
        //         }
        //     });

    }

//     saveInvoice() {
//         this.transactionDetails = [];
//         for (var i = 0; i < this.categoryDetailList.length; i++) {
//           for (var j = 0; j < this.items.length; j++) {
//             const itemObj = this.items.find(
//               (obj: any) => obj.itemId === this.items[j].product
//             );
//             if (this.categoryDetailList[i].coaCompanyId === itemObj.coaCompanyId) {

//               let transAssociation = {
//                 itemId: this.items[j].product,
//                 qty: this.items[j].qty,
//                 rate: this.items[j].rate,
//                 description: this.items[j].description
//               };

//               let transactionDetail = {
//                 coaCompanyId: this.categoryDetailList[i].coaCompanyId,
//                 amount: this.items[j].qty * this.items[j].rate,
//                 description: this.categoryDetailList[i].description,
//                 departmentId: this.categoryDetailList[i].departmentId,
//                 transAssociation: transAssociation
//               };
    
//               this.transactionDetails.push(transactionDetail);
//               break;
//             }
//           }
//         }
    
//         const formData = JSON.parse(JSON.stringify(this.formData))

//         let invoicePayload = {
//           // id: this.data.isEdit ? this.data.id : "",
//           entityId: formData.entityId,
//           transactionDate: formData.transactionDate.toISOString(),
//           amount: formData.totalAmt,
//           paymentInfo: formData.paymentInfo,
//           dueDate: formData.dueDate.toISOString(),
//           description: formData.description,
//           tnumber: formData.tnumber,
//           transactionDetails: formData.transactionDetails
//         };

//         this.billService
//         .addBill(invoicePayload)
//         .subscribe((res) => {
//         if (res.code == "1") {
//           this.notification.success(res.message);
//           if (this.UploadedList.length > 0) {
//             this.UploadedList.map(
//               (o: { transactionId: any }) => (o.transactionId = res.results)
//             );
//             this.UpdateDocument(this.UploadedList);
//           }
//         }
//       });
//   }

    UpdateDocument(data: any) {
        this.billService.updateDocumentBill(data).subscribe(
            (res) => {
                if (res.code == "1") {
                    this.notification.success(res.message);
                }
            },
            (error) => { }
        );
    }


    DownloadDocument(id: any, fileName: any) {
        this.billService.downloadDocumentBillItem(id).subscribe(
            (res) => {
                this.downloadAsBlob(res, fileName);
            },
            (error) => { }
        );
    }

    downloadAsBlob(response: any, fileName: any) {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(response.body);
        link.download = fileName;
        link.click();
    }

    DeleteDocument(id: any, item: any) {
        this.billService.deleteDocumentBillItem(id).subscribe(
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
            (error) => { }
        );
    }

    goBackFront() {
        this.router.navigate(['/bills']);
    }
}
