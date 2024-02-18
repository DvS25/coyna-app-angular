import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CompanyService, UtilityHelper } from "../../shared";
import { Router } from "@angular/router";
import { SelectionModel } from '@angular/cdk/collections';
import { AdminComponent } from 'src/app/layouts/admin/admin.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceComponent } from './new-service/new-service.component';
import { ProductOrServiceComponent } from './product-service/product-service.component';
import { ProductComponent } from './new-product/new-product.component';

export interface PeriodicElement {
    name: string;
    itemType: string;
    description: string;
    qtyInStock: string;
}

const ELEMENT_DATA: PeriodicElement[] = [

]
// entryComponents: [ProductComponent]

/**
 * @title Table with pagination
 */
@Component({
    selector: 'app-item-classification-list',
    templateUrl: './item-classification-list.component.html',
    styleUrls: ['./item-classification-list.component.scss']
})
export class ItemClassificationListComponent {

    displayedColumns: string[] = ['select', 'name', 'itemType', 'description', 'qtyInStock', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);
    @ViewChild(MatPaginator) paginator!: MatPaginator;


    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource)
    }

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private companyService: CompanyService,
        private router: Router,
        private utility: UtilityHelper,
        private AdminComponent: AdminComponent,
        private dialog: MatDialog,
        private notification: ToastrService,

    ) { }

    // @ts-ignore
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;



    ngOnInit(): void {
        this.AdminComponent.SetTitle('Item Classification');
        this.GetProductAndServiceList();
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.dataSource.data);
    }

    checkboxLabel(row?: PeriodicElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
    }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
        // This example uses English messages. If your application supports
        // multiple language, you would internationalize these strings.
        // Furthermore, you can customize the message to add additional
        // details about the values being sorted.
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    ConfirmProductOrService(): void
    {
        const dialogRef = this.dialog.open(ProductOrServiceComponent,
        {
            maxWidth: '650px',            
        });
        dialogRef.afterClosed().subscribe((result) => {
            if(!result) {
                return;
            }            
            const componentName = result == 'product' ? ProductComponent : ServiceComponent;
            this.openProductOrServiceDialog(componentName);
        });
    }

    GetProductAndServiceList()
    {
        this.companyService.GetProductAndServiceList()
            .subscribe(res => {
                if (res.code == '1'){
                    this.dataSource.data = res.results;
                }
            })
    }

    openProductOrServiceDialog(componentName: any) {
        const dialogRef = this.dialog.open(componentName,
            {
                // maxWidth: '700px', 
            });
            dialogRef.afterClosed().subscribe((result) => {
               
            });
    }

    EditProductAndService(element : any = {})
    {
        debugger
        let EditData : any = {};
        EditData = element;
        if(EditData)
        {
            if(EditData.itemType == "PRODUCT")
            {
                const dialogRef = this.dialog.open(ProductComponent,
                {
                    maxWidth: '1000px',
                    data: EditData
                });
            }
            else
            {
                const dialogRef = this.dialog.open(ServiceComponent,
                {
                    maxWidth: '1000px',
                    data: EditData
                });
            }
        }
    }

    DeleteProductAndService(element : any = {})
    {
        this.companyService.DeleteProductOrService(element.itemId)
            .subscribe(res => {
                if (res.code == '1'){
                    this.notification.success('Deleted Successfully');
                    this.GetProductAndServiceList();
                }
            })
    }

}
