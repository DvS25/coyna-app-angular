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
    selector: 'app-expense',
    templateUrl: './expense.component.html',
    styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent {
    uploader: FileUploader;
    options: any[] = [];
    department: any[] = [];
    items: any[] = [];
    vendorlist: any[] = [];
    UploadedList: any = [];
    vendorId: any = [];
    JournalData: any = {};
    files: any;
    categoryDetailList: any[] = [
     ];
    itemClassificationList: any[] = [
    ];
    categoryDetailListOld: any[] = [];
    grandTotal: number = 0;
    expenceId!: string | null;
    selected: any;
    filtered: any;
    response: any;
    formData: any = {};
    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        private toastr: ToastrService,
        private companyService: CompanyService,
        private router: Router,
        private utility: UtilityHelper,
        private AdminComponent: AdminComponent,
        private activatedRoute: ActivatedRoute,
        private vendorService: VendorExpenseService,
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
    DownloadDocument(id: any, fileName: any) {
        this.vendorService.downloadDocumentJournalEntryItem(id).subscribe(
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
    ngOnInit(): void {
        this.AdminComponent.SetTitle('Expense');
        this.expenceId = this.activatedRoute.snapshot.paramMap.get('id');

        if (this.expenceId !== "0") {
            this.getExpenseData()
        }

        console.log(typeof (this.expenceId))
        this.getData();
        this.getDropdown();
        this.getitems();
        this.getDropdownDepartment();
        this.categoryDetailListOld = JSON.parse(JSON.stringify(this.categoryDetailList));
        console.log('this.categoryDetailListOld ', this.categoryDetailListOld)
    }


    DeleteDocument(id: any, item: any) {
        this.vendorService.deleteDocumentJournalEntryItem(id).subscribe(
            res => {
                if (res.code == "1") {
                    item.remove();
                    if (this.JournalData.transactionId) {
                        this.UploadedList.pop((o: { transDocId: any; }) => o.transDocId == id);
                    }
                    this.notification.success(res.message);

                }
            }, error => {
            })
    }
    public getData() {
        this.vendorService.getVendorExpenses().subscribe((vendorlist => {
            this.vendorlist = vendorlist.results;
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
        console.log(this.categoryDetailListOld)
    }

    setDepartment(uid: any, ind: any) {
        const u = this.department.find((ele: any) => (ele.departmentId === uid));

        ind = this.itemClassificationList[ind]?.catIndex || ind
        this.categoryDetailList[ind].department = u.departmentId
    }
    public getDropdown() {
        this.vendorService.getPaymentAccountExpenses().subscribe((options => {
            this.options = options.results;
        }));
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
        this.itemClassificationList[index].amount = this.itemClassificationList[index].qty*this.itemClassificationList[index].rate
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
            "companyId":formData.entityId,
            "transactionCategory":"EXPENSE",
            "description":"Sales",
            "entityId":formData.entityId,
            "transactionDetails": this.categoryDetailList.map((ele: any) => {

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

                if (this.expenceId !== "0") {
                    t2.transactionDtlId = ele.transactionDtlId
                }

                return t2;
            }),
            "paymentAccount":formData.paymentAccount,
            "amount": this.grandTotal
        }
        const postData = {
         };
         if (this.expenceId === "0") {
             this.vendorService.saveExpense(payLoad).subscribe((data) => {
               this.response = data;
                this.notification.success("Saved Successfully!");
                this.router.navigate(['/vendor-expense']);
            });
        } else {
            this.vendorService.updateExpense(this.expenceId, payLoad).subscribe((data) => {
                    this.notification.success("Updated Successfully!");
                    this.router.navigate(['/vendor-expense']);
                  this.response = data;
                });
         }
    }

    
    getExpenseData() {
        this.vendorService.getExpense(this.expenceId).subscribe((data) => {
            console.log("data = ", data);
            if (data.type == "Success" && data.results) {
                const tempData = data.results;
                this.formData = tempData;
                this.grandTotal = tempData.amount;
                this.categoryDetailList = tempData.transactionDetails,
                this.itemClassificationList = tempData.transactionDetails.filter((ele: any) => (ele?.transAssociation?.itemId)).map((ele: any) => ({...ele.transAssociation, product: ele.transAssociation.itemId}))
            }
        });
    }


    goBack() {
        this.router.navigate(['/vendor-expense']);
    }
}
