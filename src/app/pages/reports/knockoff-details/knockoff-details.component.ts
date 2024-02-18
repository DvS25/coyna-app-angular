
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { CompanyService } from 'src/app/shared';
import {ToastrService} from "ngx-toastr";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-knockoff-details',
  templateUrl: './knockoff-details.component.html',
  styleUrls: ['./knockoff-details.component.scss']
})
export class KnockoffDetailsComponent {

    displayedColumns: string[] = ['vendorName',"invoiceNumber","invoiceDate",
    "invoiceAmount","dueDate","amountPaid","paymentDate","paymentType","referenceNumber","paymentStatus","dueAmount"];
    dataSource = new MatTableDataSource;
    constructor(
      private _liveAnnouncer: LiveAnnouncer,
      private companyService:CompanyService
    ){}

    // @ts-ignore
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;

    announceSortChange(sortState: Sort) {
      if (sortState.direction) {
          this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
          this._liveAnnouncer.announce('Sorting cleared');
      }
  }

    ngOnInit(){
      this.dataSource = new MatTableDataSource(); // create new object
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
        this.getKnockOffReports()
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

    getKnockOffReports() {
        this.companyService.getReports("knockoff-report").subscribe(res => {
            if (res.code == "1") {
                this.dataSource.data = res.results;
            }
        })
    }

}
