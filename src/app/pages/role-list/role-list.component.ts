import {Component, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, FormControl, FormArray, Validators, AbstractControl} from '@angular/forms';
import {BrowserDB, CompanyService, Constants, InvoiceManagementService, blobFileDownload, unquieArray, UtilityHelper} from "../../shared";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})

export class RoleListComponent {
	roleList: any;
	
	constructor(
        private browserDB: BrowserDB,
        private constants: Constants,
        private formBuilder: FormBuilder,
        private companyService: CompanyService,
		private toastr: ToastrService,
		private utility: UtilityHelper,
		private router: Router
    ) {
        this.getRoles();
    }
	
	getRoles(){
		debugger
		this.companyService.getRoleList().subscribe(res => {
            if (res.code == '1') {
                this.roleList = res.results;
            }
        })
	}
	
	delRow(roleId: string){
		console.log("del role",roleId);
		var bool = confirm("Are you sure to delete this role?")
		
		if(bool)
		{
			this.companyService.deleteRole(roleId).subscribe(res => {
				if (res.code == '1') {
					this.toastr.success("Role Deleted Successfully..");
					this.getRoles();
				}
			})
		}
	}
	
	editRow(roleId: string){
		console.log("edit role",roleId);
		this.router.navigate(
			['/add-role'],
			{queryParams:{roleId:roleId}}
		);
	}
}
