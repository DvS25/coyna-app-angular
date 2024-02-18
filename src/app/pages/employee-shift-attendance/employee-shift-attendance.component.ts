import { LiveAnnouncer } from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';

import {FormGroup, FormBuilder, FormControl, FormArray, Validators, AbstractControl} from '@angular/forms';
import { CompanyService, UtilityHelper } from "../../shared";
import * as moment from 'moment';
import {DatePipe} from "@angular/common";
import {ToastrService} from "ngx-toastr";

export interface PeriodicElement {
    gsa: string;
    pos: string;
    gsaname: string;
    in: string;
    out: string;
    thours: string;
    date: string;
    time: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    // {gsa: 'Emp 1', pos: 'POS1', gsaname: '', in: '', out: '', thours: '', date: '', time: ''},
    // {gsa: 'Emp 2', pos: 'POS2', gsaname: '', in: '', out: '', thours: '', date: '', time: ''},
    // {gsa: 'Emp 3', pos: 'POS3', gsaname: '', in: '', out: '', thours: '', date: '', time: ''},
    // {gsa: 'Emp 4', pos: 'POS4', gsaname: '', in: '', out: '', thours: '', date: '', time: ''},
    // {gsa: 'Emp 5', pos: 'POS5', gsaname: '', in: '', out: '', thours: '', date: '', time: ''},
    // {gsa: 'Emp 6', pos: 'POS6', gsaname: '', in: '', out: '', thours: '', date: '', time: ''},
];

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-shiftatt',
  templateUrl: './employee-shift-attendance.component.html',
  styleUrls: ['./employee-shift-attendance.component.scss']
})
export class ShiftattComponent implements AfterViewInit {
    displayedColumns = ['GSA','pos', 'gsaname','in','out','total hours','date'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    employeeShiftForm!: FormGroup;
    submitted: boolean = false;
    inTime: any;
    outTime: any;

    startDate: string | null;
    endDate: string | null;
    maxDate: string | null;
    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private formBuilder: FormBuilder,
        private service: CompanyService,
        private utility: UtilityHelper,
        datePipe: DatePipe,
        private toastr: ToastrService
    ) {
        this.createContactForm();
        const dateFormat = 'dd/MM/yyyy';
        this.startDate = datePipe.transform(
            new Date().setDate(new Date().getDate() - 1),
            dateFormat
        );
        this.maxDate = this.endDate = datePipe.transform(new Date(), dateFormat);
    }

    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnInit(): void {
        console.log(';;;', this.startDate)
    }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
        // details about the values being sorted.
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }


    //===================================================================
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    /**
     * @Dynamic  table is start
     */

    createContactForm() {
        this.employeeShiftForm = this.formBuilder.group({
            Rows: this.formBuilder.array([this.initRows()]),
        });
    }


    //getter function ease up to get the form controls
    get formArr() {
        return <FormArray> (this.employeeShiftForm.get('Rows') as FormArray);
    }

    initRows() {
       return  this.formBuilder.group({
           gsa: ['', [Validators.required]],
           pos: ['', [Validators.required]],
           gsaname: ['', [Validators.required]],
           in: ['', [Validators.required]],
           out: ['', [Validators.required]],
           thours: ['', []],
           date: ['', [Validators.required]],
        });
    }
    addNewRow() {
        this.formArr.push(this.initRows());
    }

    deleteRow(index: number) {
        // @ts-ignore
        this.formArr.removeAt(index);
    }

    onSubmit() {
        this.submitted = true
        // @ts-ignore
        console.log('Your:---- : ', this.employeeShiftForm.get('Rows'));
        if (this.employeeShiftForm.invalid) return
        for (let item of this.employeeShiftForm.value.Rows) {
            const newObj = {
                "shiftId": "a5b10322-f790-4f15-8956-f1b3dc91d585",
                "gsa": item.gsa,
                "pos": item.pos,
                "gsaName": item.gsaname,
                "checkedInTime": item.in,
                "checkedOutTime":item.out,
                "duration": item.thours,
                "timesheetDate": new Date(item.date)
            }
            this.service.addTimeSheet(newObj)
                .subscribe(res=>{
                    if (res.code == '1') {
                        this.toastr.success(res.message);
                    }
                });
        }

    }

    totalHours(inTime: any, outTime: any) {
        let start = moment.utc(inTime, "HH:mm");
        let end = moment.utc(outTime, "HH:mm");
        let d = moment.duration(start.diff(end));
      return  moment.utc(+d).format('H:mm')
    }
}

