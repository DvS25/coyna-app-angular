import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserDB, Constants } from 'src/app/shared';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit, AfterViewInit {
  PageTitle: string = "";
  UserData: any;
  CompanySettings: any = {};
  constructor(
    private router: Router,
    private constants: Constants,
    private browser: BrowserDB
  ) {
  }
  async ngOnInit() {
    this.UserData = this.browser.getLocalStorage(this.constants.SET_USER_RESPONSE);
    this.CompanySettings = this.UserData.companySettings;
    this.PageTitle = "";
  }
  async ngAfterViewInit() {
    await this.toggleSubmenuList();
  }
  toggleSideMenu() {
    const sideNavBar: HTMLElement | null = document.querySelector('.main-wraper');
    sideNavBar?.classList.toggle('active');
  }
  toggleSubmenuList() {
    let activeDropDown: EventTarget | null;
    let dropdownlist = document.querySelectorAll('.link-dropdown-btn');

    for (let i = 0; i < dropdownlist.length; i++) {
      dropdownlist[i].addEventListener('click', (event) => {
        if ((event.currentTarget as HTMLElement).classList.contains('active')) {
          (event.currentTarget as HTMLElement).classList.remove('active');
          (event.currentTarget as HTMLElement).nextElementSibling?.removeAttribute('style');
        } else {
          if (activeDropDown && !(event.currentTarget as HTMLElement).classList.contains('profile-dropdown-btn')) {
            (activeDropDown as HTMLElement).classList.remove('active');
            ((activeDropDown as HTMLElement).nextElementSibling as HTMLElement).removeAttribute('style')
          }
          (event.currentTarget as HTMLElement).classList.add('active');
          ((event.currentTarget as HTMLElement).nextElementSibling as HTMLElement).style.height = (event.currentTarget as HTMLElement).nextElementSibling?.scrollHeight + 'px';
          if (!(event.currentTarget as HTMLElement).classList.contains('profile-dropdown-btn')) {
            activeDropDown = event?.currentTarget;
          }
        }
      });
    }
  }

  Logout() {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }

  SetTitle(title: string) {
    this.PageTitle = title;
  }
}
