import { Component } from '@angular/core';
import {
    AbstractControl, FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { Constants, CompanyService, UtilityHelper } from "../../shared";
import { BrowserDB } from "../../shared";
import { AddressHelper } from "../../shared";
import { AdminComponent } from 'src/app/layouts/admin/admin.component';
import { FileUploader } from 'ng2-file-upload';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
    selector: 'app-customer-info',
    templateUrl: './customer-info.component.html',
    styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent {
    // @ts-ignore
    CustomerForm: FormGroup;
    SameasLegalnameList: any = [];
    CompanyData: any = {}
    submitted: boolean = false;
    taxIdType: string = "EIN";
    EINTaxType: boolean = true;
    SSNTaxType: boolean = false;
    sameaslegalname: string = "";
    LegalData: any = {};
    countryList: any;
    stateList: any;
    cityList: any;
    hasAnotherDropZoneOver: boolean = false;
    // @ts-ignore\
    uploader: FileUploader;
    image: any;

    constructor(
        private service: CompanyService,
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        private router: Router,
        private AdminComponent: AdminComponent,
        private sanitizer: DomSanitizer
    ) {
        this.uploader = new FileUploader({
            url: String(URL),
            disableMultipart: false,
            formatDataFunctionIsAsync: false,
            formatDataFunction: async (item: { _file: { name: any; size: any; type: any; }; }) => {
                return new Promise((resolve, reject) => {
                    resolve({
                        name: item._file.name,
                        length: item._file.size,
                        contentType: item._file.type,
                        date: new Date()
                    });
                });
            }
        });
        this.uploader.onAfterAddingFile = (items) => {
            this.uploader.clearQueue();
            let data: any = [];
            data.push(items.file.rawFile);
            this.onFileSelected(data);
        };

    }


    ngOnInit(): void {
        this.AdminComponent.SetTitle('Your Information');
        this.CustomerForm = this.formBuilder.group(
            {
                "businessName": ['', [Validators.required]],
                "taxIdNumber": ['', [Validators.nullValidator]],
                "address": ['', [Validators.required]],
                "city": ['', [Validators.required]],
                "state": ['', [Validators.required]],
                "country": ['', [Validators.required]],
                "zipCode": ['', [Validators.required]],
                "emailId": ['', [Validators.required]],
                "contactNumber": ['', [Validators.required]],
                "website": ['', [Validators.nullValidator]],
                // "legalAddress": ['', [Validators.nullValidator],]
                // "legalCity": ['', [Validators.nullValidator]],
                // "legalState": ['', [Validators.nullValidator]],
                // "legalZipCode": ['', [Validators.nullValidator]],
                // "legalEmailId": ['', [Validators.nullValidator]],
                // "legalContactNumber": ['', [Validators.nullValidator]],
                // "legalWebsite": ['', [Validators.nullValidator]],
                "sameaslegalname": ['', [Validators.nullValidator]],
                "file": ''
            }
        );
        this.DownloadImage();
        this.GetCompanyData();
        this.GetSameasLegalname();
        this.GetCountry();
    }

    get f(): { [key: string]: AbstractControl; } {
        return this.CustomerForm.controls;
    }

    GetSameasLegalname() {
        this.SameasLegalnameList.push({ name: 'Yes' });
        this.SameasLegalnameList.push({ name: 'No' });
    }

    sameaslegalnameOnChange() {
        if (this.sameaslegalname == "Yes") {
            this.LegalData = {};
        }
    }

    GetCountry() {
        this.service.getV1Country().subscribe(res => {
            console.log(res);
            if (res.code == "1") {
                this.countryList = res.results;
            }
        })
    }

    CountryOnChange(value: string) {
        this.service.getV1State(value).subscribe(res => {
            console.log(res);
            if (res.code == "1") {
                this.stateList = res.results;
            }
        })
    }

    StateOnChange(value: string) {
        this.service.getV1City(value).subscribe(res => {
            console.log(res);
            if (res.code == "1") {
                this.cityList = res.results;
            }
        })
    }



    TaxIdTypeOnChange(Value: any, action: any) {
        let DD = this.SSNTaxType;
        if (Value == 'EIN' && action) {
            this.SSNTaxType = false;
            this.EINTaxType = true;
            this.taxIdType = Value;
        }
        else if (Value == 'SSN' && action) {
            this.SSNTaxType = true;
            this.EINTaxType = false;
            this.taxIdType = Value;
        }
        else {
            this.SSNTaxType = false;
            this.EINTaxType = false;
            this.taxIdType = '';
            this.CompanyData.taxIdNumber = '';
        }
    }

    GetCompanyData() {
        // debugger
        this.service.getCompany().subscribe(
            res => {
                if (res.code == "1") {
                    this.CompanyData = res.results;
                    if (this.CompanyData.legalAddress || this.CompanyData.legalCity) {
                        this.sameaslegalname = 'No';
                    }
                    else {
                        this.sameaslegalname = 'Yes';
                    }
                    if (this.CompanyData.taxIdType) {
                        this.TaxIdTypeOnChange(this.CompanyData.taxIdType, 'checked');
                    }
                    this.CountryOnChange(this.CompanyData.country);
                    this.StateOnChange(this.CompanyData.state);
                }
            }, error => {
            })
    }

    SaveCompanyInfo() {
        debugger
        this.submitted = true;
        if (this.CustomerForm.invalid) {
            return;
        }
        const obj = {
            "fiscalYear": this.CompanyData.fiscalYear,
            "accountingMethod": this.CompanyData.accountingMethod,
            "taxStructureId": this.CompanyData.metadata.taxStructureId,
            "dateOfIncorporation": new Date(this.CompanyData.dateOfIncorporation),
            "currencyId": this.CompanyData.metadata.currencyId,
            "dateFormat": this.CompanyData.dateFormat,
            "numberFormat": this.CompanyData.billPaymentTerms,
            "billPaymentTerms": this.CompanyData.billPaymentTerms,
            "invoicePaymentTerms": this.CompanyData.invoicePaymentTerms,
            "enableCOA": this.CompanyData.enableCOA,
            "enableDepartment": this.CompanyData.enableDepartment,
            "companyType": this.CompanyData.companyType,
            "businessName": this.CustomerForm.value.businessName,
            "taxIdType": this.taxIdType,
            "taxIdNumber": this.CustomerForm.value.taxIdNumber,
            "address": this.CustomerForm.value.address,
            "city": this.CustomerForm.value.city,
            "state": this.CustomerForm.value.state,
            "zipCode": this.CustomerForm.value.zipCode,
            "emailId": this.CustomerForm.value.emailId,
            "contactNumber": this.CustomerForm.value.contactNumber,
            "website": this.CustomerForm.value.website,
            "legalAddress": this.LegalData.address ?? "",
            "legalCity": this.LegalData.city ?? "",
            "legalState": this.LegalData.state ?? "",
            "legalZipCode": this.LegalData.zipcode ?? "",
            "legalEmailId": this.LegalData.emailId ?? "",
            "legalContactNumber": this.LegalData.contactNumber ?? "",
            "legalWebsite": this.LegalData.website ?? ""
        };
        this.service.updateCompanyDetailsWithoutId(obj).subscribe(
            res => {
                if (res.code == "1") {
                    this.notification.success(res.message);
                    this.router.navigate(['/dashboard']);
                }
            }, error => {
            })
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

    async onFileSelected(event: any) {
        const file: File = event[0];
        console.log(file);
        // let data = this.uploader?.queue;
        let formData = new FormData();
        formData.append("file", file);
        this.service.UploadCompanyLogo(formData).subscribe(
            res => {
                if (res.code == "1") {
                    this.notification.success(res.message);
                    this.DownloadImage();
                }
            }, error => {
            })
    }


    downloadAsBlob(response: any) {
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(response.body);
        link.download = 'logo.png';
        link.click();
    }

    async hexToBase64(str: any) {
        let result_base64 = await new Promise((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = (e) => resolve(fileReader.result);
            fileReader.readAsDataURL(str.body);
        });
        return result_base64;
    }


    DownloadImage() {
        this.service.DownloadCompanyLogo().subscribe(
            async res => {
                let objectURL = URL.createObjectURL(res.body);
                this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            }, error => {
            })
    }















}

