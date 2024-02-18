import { LiveAnnouncer } from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';

import {FormGroup, FormBuilder, FormControl, FormArray, Validators, AbstractControl} from '@angular/forms';


export interface PeriodicElement {
    dip: string;
    op: string;
    del: string;
    ms: string;
    ih: string;
    cp: string;
    vos: string;
    bf: string;
    ad: string;
    acc: string;
    temp: string;
    options: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {dip: '30/03/3023', op: '', del: '', ms: '', ih: '', cp: '', vos: '', bf: '', ad: '', acc: '', temp: '', options: ''},
    {dip: '22/03/3023', op: '', del: '', ms: '', ih: '', cp: '', vos: '', bf: '', ad: '', acc: '', temp: '', options: ''},
    {dip: '18/03/3023', op: '', del: '', ms: '', ih: '', cp: '', vos: '', bf: '', ad: '', acc: '', temp: '', options: ''},
    {dip: '17/03/3023', op: '', del: '', ms: '', ih: '', cp: '', vos: '', bf: '', ad: '', acc: '', temp: '', options: ''},
    {dip: '10/03/3023', op: '', del: '', ms: '', ih: '', cp: '', vos: '', bf: '', ad: '', acc: '', temp: '', options: ''},
    {dip: '20/03/3023', op: '', del: '', ms: '', ih: '', cp: '', vos: '', bf: '', ad: '', acc: '', temp: '', options: ''},
    {dip: '30/03/3023', op: '', del: '', ms: '', ih: '', cp: '', vos: '', bf: '', ad: '', acc: '', temp: '', options: ''},
    {dip: '30/03/3023', op: '', del: '', ms: '', ih: '', cp: '', vos: '', bf: '', ad: '', acc: '', temp: '', options: ''},
];

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-fueldip',
  templateUrl: './fuel-dip.component.html',
  styleUrls: ['./fuel-dip.component.scss']
})
export class FueldipComponent implements AfterViewInit {
    displayedColumns = ['dip','op','del','ms','ih','cp','vos','bf','ad','acc','temp','options'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private formBuilder: FormBuilder

    ) {
        this.createContactForm();
    }
    fueldipForm!: FormGroup;
    submitted: boolean = false;
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
        this.fueldipForm = this.formBuilder.group({
            Rows: this.formBuilder.array([this.initRows()]),
        });
    }

    //getter function ease up to get the form controls
    get formArr() {
        return this.fueldipForm.get('Rows') as FormArray;
    }
    get f(): { [key: string]: AbstractControl; } {
        // @ts-ignore
        return this.fueldipForm.get('Rows')['controls'][0]['controls'];
    }
    initRows() {
       return  this.formBuilder.group({
           gsa: ['', [Validators.required]],
           pos: ['', [Validators.required]],
           gsaname: ['', [Validators.required]],
           in: ['', [Validators.required]],
           out: ['', [Validators.required]],
           thours: ['', [Validators.required]],
           date: ['', [Validators.required]],
           time: ['', [Validators.required]],
        });
    }
    addNewRow() {
        this.formArr.push(this.initRows());
    }

    deleteRow(index: number) {
        this.formArr.removeAt(index);
    }

    onSubmit() {
        this.submitted = true
        // @ts-ignore
        console.log('Your:---- : ', this.fueldipForm.get('Rows'));

        if (this.fueldipForm.invalid) return
        console.log('Your form data : ', this.fueldipForm.value);
    }
}

