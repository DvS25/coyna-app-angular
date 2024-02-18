import {Component, ElementRef, ViewChild} from '@angular/core';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, FormControl, FormArray, Validators, AbstractControl} from '@angular/forms';
import {BrowserDB, CompanyService, Constants, InvoiceManagementService, blobFileDownload, unquieArray, UtilityHelper} from "../../shared";
import { ToastrService } from 'ngx-toastr';
import alasql from 'alasql';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent {
	roleList: any;
	editRoleArr: any;
	permissionList: any;
    userTypeList: any = [];
	countryList: any;
    stateList: any;
    cityList: any;
	formSubmitted: boolean = false;
	paramRoleId: any = null;
	
	addRoleForm = this.formBuilder.group({
        roleName: ['', Validators.required],
        userType: ['', Validators.required],
    })
	
	constructor(
        private browserDB: BrowserDB,
        private constants: Constants,
        private formBuilder: FormBuilder,
        private companyService: CompanyService,
		private toastr: ToastrService,
		private utility: UtilityHelper,
		private route: ActivatedRoute,
		private router: Router,		
    ) {
        this.getPermissions();
    }
	
	ngOnInit() {
		this.paramRoleId = this.route.snapshot.queryParamMap.get('roleId');
		console.log("paramRoleId",this.paramRoleId);
		
		if(this.paramRoleId != null)
		{
			setTimeout(() => {
				this.companyService.getRoleList().subscribe(res => {
					if (res.code == '1') {
						this.roleList = res.results;
						
						var cri = alasql('SELECT roleId,roleName,userType,permissions FROM ? where roleId = ?',[this.roleList, this.paramRoleId]);
						
						if(cri.length > 0)
						{
							this.editRoleArr = cri[0];
							
							this.addRoleForm.get('roleName')?.setValue(this.editRoleArr.roleName);
							this.addRoleForm.get('userType')?.setValue(this.editRoleArr.userType);
							
							for(var j = 0 ; j < this.editRoleArr.permissions.length ; j++)
							{
								for(var i = 0 ; i < this.permissionList.length ; i++)
								{
									if(this.permissionList[i].permissionId == this.editRoleArr.permissions[j].permissionId)
									{
										const ele = document.getElementById("chk_per_"+i) as HTMLInputElement;
										ele.checked = true;
									}
								}
							}
						}
						else
						{
							this.paramRoleId = null;
						}
					}
				})
			}, 1000);			
		}
	}
	
	getPermissions() {
        this.companyService.getPermissionList().subscribe(res => {
            if (res.code == '1') {
                this.permissionList = res.results;
				this.getUserTypes();
            }
        })
    }
	
	getUserTypes() {
        this.companyService.getUserTypeList().subscribe(res => {
            if (res.code == '1') {
                this.userTypeList = res.results;
            }
        })
    }
	
	get f() {
		return this.addRoleForm.controls;
    }
	
	saveRole(){
		console.log("start");
		this.formSubmitted = true;
		if (this.addRoleForm.invalid) {
			this.toastr.error("Fields Missing.");
            return;
        }
		console.log("end");
		this.formSubmitted = false;
		/*------------------------------------------------------------*/
		
		var permissionIds = [];
		
		for(var i = 0 ; i < this.permissionList.length ; i++)
		{
			const ele = document.getElementById("chk_per_"+i) as HTMLInputElement;
			if(ele.checked == true)
			{
				permissionIds.push(this.permissionList[i].permissionId);
			}
		}
		
		if(permissionIds.length == 0)
		{
			this.toastr.error("Please Select Atleast Anyone Permission.");
			return;
		}
		
		
		var cri = {
			"roleName": this.addRoleForm.value.roleName,
			"userType": this.addRoleForm.value.userType,
			"permissionIds": permissionIds
		}
		
		if(this.paramRoleId != null)
		{
			// @ts-ignore
			cri["roleId"] = this.paramRoleId;
			console.log(cri);
			
			this.companyService.updateRole(cri, this.paramRoleId).subscribe(res => {
				if (res.code == '1') {
					this.toastr.success("Role Updated Successfully..");
					this.addRoleForm.reset();
									
					for(var i = 0 ; i < this.permissionList.length ; i++)
					{
						const ele = document.getElementById("chk_per_"+i) as HTMLInputElement;
						if(ele)
						{
							ele.checked = false;
						}
					}
					
					this.router.navigate(['/role-list']);
				}
			})
		}
		else
		{
			this.companyService.addRole(cri).subscribe(res => {
				if (res.code == '1') {
					this.toastr.success("Role Added Successfully..");
					this.addRoleForm.reset();
					
					const scrollToTopPage = document.querySelector('.dashboard');
					if (scrollToTopPage) {
						scrollToTopPage.scrollIntoView({ behavior: 'smooth' });
					}
									
					for(var i = 0 ; i < this.permissionList.length ; i++)
					{
						const ele = document.getElementById("chk_per_"+i) as HTMLInputElement;
						if(ele)
						{
							ele.checked = false;
						}
					}
					
					if(this.paramRoleId != null)
					{
						this.router.navigate(['/role-list']);
					}
				}
			})
		}
	}
	
	backToList(){
		this.router.navigate(['/role-list']);
	}
}
