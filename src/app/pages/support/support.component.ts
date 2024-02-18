import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";
import {Constants} from "../../shared";
import { BrowserDB } from "../../shared";
import { CompanyService } from "../../shared";

@Component({
    selector: 'app-support',
    templateUrl: './support.component.html',
    styleUrls: ['./support.component.scss']
})
export class SupportComponent {
  constructor(
      private formBuilder: FormBuilder,
      private notification: ToastrService,
      private router: Router,
      private constants: Constants,
      private browser: BrowserDB,
      private service: CompanyService
  ){ }

  // @ts-ignore
  supportForm: FormGroup;
  submitted = false;
  companyList: any;



  ngOnInit(): void {
      this.getCompanies();
    this.supportForm = this.formBuilder.group(
        {
          cName: ['', [Validators.required]],
          userId: ['', [Validators.required]],
          name: ['', [Validators.required, Validators.pattern(this.constants.REGEXP.alphanumWithSpaceDot)]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]],
          mobileNo: [
            '',
            [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(12),
              Validators.pattern(this.constants.REGEXP.number)
            ]
          ],
        },
    );
  }


  get f(): { [key: string]: AbstractControl; } {
    return this.supportForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.supportForm.invalid) {
      return;
    }
    console.log('finace Data',this.supportForm.value )
    const newObj =  {
         
      }

    this.service.addOperation(newObj).subscribe(
        res=>{
            if (res.code == "1") {
                this.submitted = false;
                this.notification.success(res.message);
                this.supportForm.reset();
                window.location.reload()
            }
        },
        error => {
          console.log('erroor', error)
        }
    )
  }

  getCompanies () {
      this.service.getCompany().subscribe(res=> {
          if (res) {
             this.companyList =  res.results;
              console.log('Res', res)
          }
      })
  }
}
