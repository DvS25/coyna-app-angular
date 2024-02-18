import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {BrowserDB, Constants} from "../../shared";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {	
	userDetails = this.browserDB.getLocalStorage(this.constants.SET_USER_RESPONSE);
  constructor(
      private browserDB: BrowserDB,
      private constants: Constants,
      private router: Router,
      private browser: BrowserDB,
      private toastr : ToastrService,
      private constant: Constants
  ) {

  }
	user: object = this.browser.getLocalStorage(this.constant.SET_USER_RESPONSE)
	permissions = this.browser.getLocalStorage(this.constant.SET_PERMISSION_RESPONSE)
	
	sideobj:any = {
		"Dashboard" : true,
		"Initialization" : true,
		"CompanyManagement" : true,
		"StoreManagement" : true,
		"Operations" : true,
		"Finance" : true,
		"AccountsPayable" : true,
		"VendorManagement" : true,
		"AssociateVendor" : true,
		"InvoiceManagement" : true,
		"InvoiceListing" : true,
		"PaymentProcessing" : true,
		"ExpenseManagement" : true,
		"ShiftSheet" : true,
		"ShiftSheetManager" : true,
		"ShiftSheetApprover" : true,
		"PayableAndReceivable" : true,
		"FinancialReporting" : true,
		"ManagementReports" : true,
		"Banking" : true,
		"AccessControl" : true,
		"RoleList" : true
	};
  
	ngOnInit() {
		//console.log("this.userPermissions",JSON.stringify(this.permissions));
        for(var i = 0 ; i < this.permissions.length ; i++)
		{
			var perName = this.permissions[i].permissionName;
			if(perName == "Dashboard")
			{
				this.sideobj["Dashboard"] = true;
			}
			else if(perName == "Initialization")
			{
				this.sideobj["Initialization"] = true;
			}
			else if(perName == "CompanyManagement")
			{
				this.sideobj["Initialization"] = true;
				this.sideobj["CompanyManagement"] = true;
			}
			else if(perName == "StoreManagement")
			{
				this.sideobj["Initialization"] = true;
				this.sideobj["StoreManagement"] = true;
			}
			else if(perName == "Operation")
			{
				this.sideobj["Initialization"] = true;
				this.sideobj["Operation"] = true;
			}
			else if(perName == "Finance")
			{
				this.sideobj["Initialization"] = true;
				this.sideobj["Finance"] = true;
			}
			else if(perName == "AccountsPayable")
			{
				this.sideobj["AccountsPayable"] = true;
			}
			else if(perName == "VendorManagement")
			{
				this.sideobj["AccountsPayable"] = true;
				this.sideobj["VendorManagement"] = true;
				this.sideobj["AssociateVendor"] = true;
			}
			else if(perName == "InvoiceManagement")
			{
				this.sideobj["AccountsPayable"] = true;
				this.sideobj["InvoiceManagement"] = true;
			}
			else if(perName == "InvoiceListing")
			{
				this.sideobj["AccountsPayable"] = true;
				this.sideobj["InvoiceListing"] = true;
			}
			else if(perName == "PaymentProcessing")
			{
				this.sideobj["AccountsPayable"] = true;
				this.sideobj["PaymentProcessing"] = true;
			}
			else if(perName == "ExpenseManagement")
			{
				this.sideobj["AccountsPayable"] = true;
				this.sideobj["ExpenseManagement"] = true;
			}
			else if(perName == "ShiftSheet")
			{
				this.sideobj["ShiftSheet"] = true;
			}
			else if(perName == "ShiftSheet-Manager")
			{
				this.sideobj["ShiftSheetManager"] = true;
			}
			else if(perName == "ShiftSheet-Approver")
			{
				this.sideobj["ShiftSheetApprover"] = true;
			}
			else if(perName == "PayableAndReceivable")
			{
				this.sideobj["PayableAndReceivable"] = true;
			}
			else if(perName == "FinancialReporting")
			{
				this.sideobj["FinancialReporting"] = true;
			}
			else if(perName == "ManagementReports")
			{
				this.sideobj["ManagementReports"] = true;
			}
			else if(perName == "Banking")
			{
				this.sideobj["Banking"] = true;
			}
		}
		
		//console.log("sideobj",JSON.stringify(this.sideobj));
    }
	
  logout(){
    localStorage.clear();
    this.toastr.success('logout Successfully')
    this.router.navigate(['/login'])
  }

  goTo(){
	  console.log("HEREEEEE");
    // @ts-ignore
    if ("SUPER_ADMIN" == this.user.userType) {
      this.router.navigate(['shift-sheet/manager']);
    } else {
      this.router.navigate(['shift-sheet/employee']);
    }
  }

}
