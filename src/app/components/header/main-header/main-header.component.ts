import { Component } from '@angular/core';
import { Router } from "@angular/router";
import jwt_decode from 'jwt-decode';
import decode from "jwt-decode";
import { Constants } from "../../../shared";
import { UserService } from "../../../shared";
import { ToastrService } from 'ngx-toastr';
import { BrowserDB } from "../../../shared";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent {
  sortName: string = '';
  fullname: string = '';
  userType: string = '';
  firstAndLastLetter: string = ''
  constructor(
    private router: Router,
    private constant: Constants,
    private service: UserService,
    private toastr: ToastrService,
    private browser: BrowserDB
  ) {
  }

  url() {
    this.router.navigate(['/setting'])
  }
  ngOnInit() {
    // @ts-ignore
    // const token = decode(this.browser.getLocalStorage(this.constant.SET_TOKEN));
    const val = this.browser.getLocalStorage(this.constant.SET_USER_RESPONSE)
    debugger
    // console.log('dddddddd', val)
    // @ts-ignore
    if (val.fullName != undefined) {
      const name = val.fullName.split(' ');
      if (name.length == 1) {
        this.firstAndLastLetter = name[0].substring(0, 1)
        this.sortName = name[0].substring(0, 1);
      }
      else {
        this.firstAndLastLetter = name[0].substring(0, 1) + name[1].substring(0, 1)
        this.sortName = name[0].substring(0, 1) + '.' + ' ' + name[1];
      }
      // // @ts-ignore
      this.fullname = val.fullName;
      // // @ts-ignore
      this.userType = val.userType;
    }
  }

  userLogout() {
    // this.service.logOut().subscribe(
    //     data=> {
    //       if (data.type == 'Success') {
    //         this.toastr.success(data.message)
    //         localStorage.clear();
    //         this.router.navigate(['/'])
    //       }
    //     },
    //     error=> {
    //       this.toastr.error(error)
    //     },
    //     ()=>{}
    // )
    localStorage.clear();
    this.toastr.success('Logout Successfully')
    this.router.navigate(['/login'])

  }
}
