import { Component } from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import { CompanyService } from "../../shared";

@Component({
    selector: 'app-stored',
    templateUrl: './store-detail.component.html',
    styleUrls: ['./store-detail.component.scss']
})
export class StoredComponent {
  constructor(
      private router: Router,
      private service: CompanyService,
      private _snap: ActivatedRoute
  ){ }
    storeDetails: any;

   name: string = '';
  ngOnInit(): void {
      this._snap.params.subscribe(param => {
          // @ts-ignore
          this.service.getCompanyDetails(param.id).subscribe(res => {
              if (res.code == '1') {
                  this.storeDetails = res.results;
                  this.getCompany(res.results.parentCompanyId)
              }
          })
      })
  }
    goTO() {
      this._snap.params.subscribe(param => {
          // @ts-ignore
          this.router.navigate(['store/edit', param.id])
      })
    }
    goBack(){
        this.router.navigate(['store-management'])
    }

    getCompany(idx?: string) {
        this.service.getCompanyDetails(idx).subscribe(res => {
            if (res.code == '1') {
                const val = res.results;
                this.name = val.name;
            }
        })
    }
}
