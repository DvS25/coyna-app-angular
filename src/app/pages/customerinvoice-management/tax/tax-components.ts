import {Component, Inject, OnInit}          from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef}        from '@angular/material/dialog';

@Component({
	           selector: 'course-dialog',
	           templateUrl: './tax-components.html'
           })
export class TaxComponent implements OnInit {

	public form: FormGroup;
	model:any = {id:null,value:'',type:'',percentage:0};

	constructor(
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<TaxComponent>,
		@Inject(MAT_DIALOG_DATA) data:any) {
		this.form = this.fb.group({
			                          value: ['', [Validators.required]],
			                          type: ['', [Validators.required]],
			                          percentage: ['', [Validators.required]],
		                          });
	}

	ngOnInit() {

	}

	save() {
		this.model.value =  this.form.value.value;
		this.model.type =  this.form.value.type;
		this.model.percentage =  this.form.value.percentage;
		this.dialogRef.close(this.model);
	}

	close() {
		this.dialogRef.close();
	}
}
