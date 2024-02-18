import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {BrowserDB, Constants, InvoiceManagementService, UtilityHelper} from "../../shared";
import {CompanyService, SharedService} from "../../shared";
import {ToastrService} from "ngx-toastr";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {Router} from "@angular/router";

export interface PeriodicElement {
    vname: string;
    invoiceNumber:string;
    invoiceDate:string;
    duedate: string;
    totalAmount: string;
    pstatus: string;
    invoice: string;
}

/**
 * @title Table with pagination
 */
@Component({
    selector: 'app-account',
    templateUrl: './invoice-listing.component.html',
    styleUrls: ['./invoice-listing.component.scss']
})
export class AccountComponent {
    showPage:boolean = true;
    displayedColumns: string[] = ['vname', 'invoiceNumber','invoiceDate','duedate', 'totalAmount', 'pstatus', 'invoice'];
    
    // @ts-ignore
    public filterForm: FormGroup;
     // @ts-ignore
     public dateFormGroup: FormGroup;

    ELEMENT_DATA: any;
    viewDiv: boolean = false;
    editDiv: boolean = false;
    listDiv: boolean = true;
    // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    dataSource = new MatTableDataSource<PeriodicElement>;
    public companyList: any;
    public vendorList: any;
    public  storeList: any;
    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private companyService: CompanyService,
        private invoiceService: InvoiceManagementService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private router: Router,
        private browserDb:BrowserDB,
        private constant:Constants,
        private sharedService: SharedService,
		private utility: UtilityHelper
    ) {
        this.getVendor();
        this.getInvoice();

    }
     // @ts-ignore
     @ViewChild(MatPaginator) paginator: MatPaginator;
     // @ts-ignore
     @ViewChild(MatSort) sort: MatSort;

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {

        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    getVendor() {
        this.companyService.getVendor()
            .subscribe(res => {
                if (res.code == "1") {
                    this.vendorList = res.results;
                }
            })
    }
    intitatePayment(apInvoiceId:string){
        this.router.navigate(['/payment-processing', apInvoiceId])
    }

    ngOnInit(): void {
		if (!this.utility.chkPagePermission('InvoiceListing'))
		{
			this.showPage = false;
		}
		
        this.dateFormGroup = this.formBuilder.group(
            {
                invoiceStartDate:'',
                invoiceEndDate:''
            },
        );
        this.filterForm = this.formBuilder.group(
            {
                vendor_id: '',
                company_id: '',
                store_id: ''
            },
        );
        this.getCompanies()

    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    search() {
        if((this.dateFormGroup.get('invoiceStartDate')?.value !=='' && this.dateFormGroup.get('invoiceEndDate')?.value==='')|| (this.dateFormGroup.get('invoiceStartDate')?.value ==='' && this.dateFormGroup.get('invoiceEndDate')?.value!=='')
        || (this.dateFormGroup.get('invoiceStartDate')?.value !== null && this.dateFormGroup.get('invoiceEndDate')?.value=== null)|| (this.dateFormGroup.get('invoiceStartDate')?.value === null && this.dateFormGroup.get('invoiceEndDate')?.value!==null))
        {
            this.toastr.info('Please select both start and end date')
            return
        }
        else
        {
            
            const isEmpty = Object.values(this.filterForm.value).every(x => x === null || x === '');
            if (isEmpty) {
                if((this.dateFormGroup.get('invoiceStartDate')?.value !=='' && this.dateFormGroup.get('invoiceEndDate')?.value!=='') && 
                (this.dateFormGroup.get('invoiceStartDate')?.value !==null && this.dateFormGroup.get('invoiceEndDate')?.value!==null))
                {
                    if(this.dateFormGroup.get('invoiceStartDate')?.value > this.dateFormGroup.get('invoiceEndDate')?.value)
                    {
                        this.toastr.info('Start date cannot be after end date')
                    }
                    else
                    {
                        this.filterInvoiceData()
                    }    
                }
                else
                {
                this.toastr.info('Please select a filter or set date range')
                return
                }    
            }
            else
            {
                this.filterInvoiceData()
            }
        
        }   
    }

    filterInvoiceData() {
        this.invoiceService.filterInvoice(this.filterForm.value, this.dateFormGroup.value)
            .subscribe(res => {
                if (res.code == '1'){
                    // for (let index = 0; index < res.results.length; index++) {
                    //     if(res.results[index].apPaymentModelList.length>0)
                    //     {
                    //         if(res.results[index].totalAmount===res.results[index].amountPaid)
                    //         {
                    //             res.results[index]['paymentStatus']='Paid'
                    //         }
                    //         else
                    //         {
                    //             res.results[index]['paymentStatus']='Pending'
                    //         }
                    //     }
                    //     if(res.results[index].apPaymentModelList.length===0)
                    //     {

                    //         res.results[index]['paymentStatus']='New'
                    //     }
                    // }
                    this.dataSource.data = res.results
                }
            })
    }

    getInvoice() {
        this.invoiceService.getInvoice()
            .subscribe(res => {
                if (res.code == '1'){
                    // for (let index = 0; index < res.results.length; index++) {
                    //     if(res.results[index].apPaymentModelList.length>0)
                    //     {
                    //         if(res.results[index].totalAmount===res.results[index].amountPaid)
                    //         {
                    //             res.results[index]['paymentStatus']='Paid'
                    //         }
                    //         else
                    //         {
                    //             res.results[index]['paymentStatus']='Pending'
                    //         }
                    //     } 
                    //     if(res.results[index].apPaymentModelList.length===0)
                    //     {
                            
                    //         res.results[index]['paymentStatus']='New'
                    //     }                        
                    // }
                    this.dataSource.data = res.results
                }
            })
    }
    customSortComparator(a: string, b: string): number {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      }

    findVendorName(id:string) {
        // @ts-ignore
      const details =  this.vendorList.find(item => item.vendorId == id);
        return details.name;
    }
    deleteInvoice(id:string){
       this.companyService.deleteInvoice(id).subscribe(res=>{
        if(res.code=='1')
        {
            this.toastr.success("Deleted Successfully")
            this.getInvoice()
        }
       })
    }

    viewInvoice(id: string) {
        // this.viewDiv= true
        // this.listDiv = false
        this.router.navigate(['invoice-details', id])
        // this.companyService.getInvoiceDetails(id).subscribe(res=> {
        //     if (res.code === '1'){
        //         // this.editInvoiceForm.setValue({
        //         //     invoiceNumber: res.invoiceNumber
        //         // })
        //     }
        // });
    }

    editInvoice() {
        this.editDiv = true;
        this.viewDiv = false;
    }


    getCompanies() {
        this.companyService.getCompany().subscribe(res => {
            if (res.code == "1") {
                this.companyList = res.results;
            }
        })
    }
    getStore(val: any) {
        const id = val.value;
        this.companyService.getStore(id)
            .subscribe(res => {
                if (res.code == "1") {
                    this.storeList = res.results;
                }
            })
    }

    reset(target?: any) {
        if (target == undefined) {
            this.dateFormGroup.reset()
            this.filterForm.reset()
            this.getInvoice()
            return;
        }
    }
}

