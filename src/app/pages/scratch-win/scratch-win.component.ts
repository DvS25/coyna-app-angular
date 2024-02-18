import { LiveAnnouncer } from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';

import {FormGroup, FormBuilder, FormControl, FormArray, Validators, AbstractControl} from '@angular/forms';


export interface PeriodicElement {
    lotto: string;
    a1: string;
    a2: string;
    a3: string;
    a4: string;
    a5: string;
    a6: string;
    a7: string;
    a8: string;
    a9: string;
    a10: string;
    online: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {lotto: 'OPEN', a1: '', a2: '', a3: '', a4: '', a5: '', a6: '', a7: '', a8: '', a9: '', a10: '', online: ''},
    {lotto: 'ADD', a1: '', a2: '', a3: '', a4: '', a5: '', a6: '', a7: '', a8: '', a9: '', a10: '', online: ''},
    {lotto: 'SUB', a1: '', a2: '', a3: '', a4: '', a5: '', a6: '', a7: '', a8: '', a9: '', a10: '', online: ''},
    {lotto: 'CLOSE', a1: '', a2: '', a3: '', a4: '', a5: '', a6: '', a7: '', a8: '', a9: '', a10: '', online: ''},
    {lotto: 'SOLD', a1: '', a2: '', a3: '', a4: '', a5: '', a6: '', a7: '', a8: '', a9: '', a10: '', online: ''},
    {lotto: 'Z', a1: '', a2: '', a3: '', a4: '', a5: '', a6: '', a7: '', a8: '', a9: '', a10: '', online: ''},
    {lotto: 'DIFF', a1: '', a2: '', a3: '', a4: '', a5: '', a6: '', a7: '', a8: '', a9: '', a10: '', online: ''},
];

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-scratchwin',
  templateUrl: './scratch-win.component.html',
  styleUrls: ['./scratch-win.component.scss']
})
export class ScratchwinComponent implements AfterViewInit {
    displayedColumns = ['lotto','a1','a2','a3','a4','a5','a6','a7','a8','a9','a10','online'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    constructor(
        private _liveAnnouncer: LiveAnnouncer,
        private formBuilder: FormBuilder

    ) {
        this.createContactForm();
    }
    scratchwinForm!: FormGroup;
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
        this.scratchwinForm = this.formBuilder.group({
            Rows: this.formBuilder.array([this.initRows()]),
        });
    }

    //getter function ease up to get the form controls
    get formArr() {
        return this.scratchwinForm.get('Rows') as FormArray;
    }
    get f(): { [key: string]: AbstractControl; } {
        // @ts-ignore
        return this.scratchwinForm.get('Rows')['controls'][0]['controls'];
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
        console.log('Your:---- : ', this.scratchwinForm.get('Rows'));

        if (this.scratchwinForm.invalid) return
        console.log('Your form data : ', this.scratchwinForm.value);
    }
}

