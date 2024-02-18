import {Component, ViewChild, ElementRef} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';

import {AddressHelper, UserService, UtilityHelper} from "../../../shared";
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";
import {Constants} from "../../../shared";
import {BrowserDB} from "../../../shared";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {FileUploadService} from "../../../shared";
import { DomSanitizer } from '@angular/platform-browser';
import { CompanyService } from "../../../shared";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    constructor(
        private service: UserService,
        private formBuilder: FormBuilder,
        private notification: ToastrService,
        private router: Router,
        private constants: Constants,
        private browser: BrowserDB,
        private utility : UtilityHelper,
        private fileUpload : FileUploadService,
        private sanitizer: DomSanitizer,
        private address: AddressHelper,
        private companyService: CompanyService
    ) {
        this.address.getCountry('all')
            .then(country => {
                this.countryList = country
            });
        this.getDepartment();
    }
    // @ts-ignore
    @ViewChild("fileInput", {static: false}) InputVar: ElementRef;

   departmentList: any;
    langugeList: any;
    // @ts-ignore
    profileForm: FormGroup
    submitted = false;
    fileToUpload: any;
    imageUrl: any = '';
    // @ts-ignore
    file: File;
    countryList: any;
    stateList: any;
    cityList:any;
    singleCountry: string = '';

    percentCompleted: number = 0;
    isMultipleUploaded = false;
    isSingleUploaded = false;
    urlAfterUpload = '';
    percentUploaded = [0];
    acceptedExtensions = "jpg, jpeg, bmp, png, wav, mp3, mp4";

    // @ts-ignore
    departmentList:  [] = []
    ngOnInit(): void {
        this.getProfileImage();
        this.getProfileData();
        this.getLanguage();
        this.profileForm = this.formBuilder.group(
            {
                userName: ['', [Validators.required]],
                phoneNumber: ['', [Validators.required]],
                department: ['', [Validators.required]],
                country: ['', [Validators.required]],
                languages: ['', []],
                email: ['', [Validators.required, Validators.email]],
                tagline: ['', []],
                gender: ['', [Validators.required]],
                city: ['', [Validators.required]],
                memo: ['', []],
                state: ['', []],
            },
        );
    }


    get f(): { [key: string]: AbstractControl; } {
        return this.profileForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.profileForm.invalid) return;
        let obj = {
            ...this.profileForm.value,
            languages: [{"languageId":this.profileForm.value.languages}]
        }
        this.service.userProfile(obj)
            .subscribe(res=> {
                if (res.responseMessage == "Success"){
                    this.notification.success('Profile is update')
                }
            }, error=> {
                console.log('Error in Profile:->', error)
            })
    }

    profileImageUpload(file: any){
        this.fileToUpload = file.files[0];
        if ( file.files[0] !== undefined) {
            if (this.utility.fileSize(file, '16 MB')){
                let reader = new FileReader();
                reader.onload = (event: any) => {
                    this.imageUrl = event.target.result;
                };
                reader.readAsDataURL(this.fileToUpload)
                this.upload(file.files)
            }
        } else {
            this.InputVar.nativeElement.value = "";
        }
    }

    upload(files: File[]) {
        const file = files[0];
        this.isSingleUploaded = false;
        this.urlAfterUpload = '';

        const formData = new FormData();
        formData.append("profileImage", file);
        this.fileUpload.uploadWithProgress(formData)
            .subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.percentCompleted = Math.round(100 * event.loaded / event.total);
                } else if (event instanceof HttpResponse) {
                    this.isSingleUploaded = true;
                    this.urlAfterUpload = event.body.link;
                }
            });
    }


    getProfileImage() {
        this.fileUpload.getProfileImage()
            .subscribe(res => {
                if (res.body !== undefined){
                    let objectURL = URL.createObjectURL(res.body);
                    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                    // const fileName = res.headers.get('content-disposition');
                }
            }, error => {
                console.log(';;;;error', error)
            })
    }
    getDepartment() {
        this.companyService.getDepartment()
            .subscribe(res => {
                if (res.code == '1'){
                    this.departmentList = res.results;
                }
            }, error => {
                console.log(';;;;error', error)
            })
    }

    getProfileData() {
        this.fileUpload.getProfileData()
            .subscribe(res => {
                if (res.body !== undefined){
                    const val = res.body.results;
                    this.findData(val.country, val.state);
                    this.profileForm.patchValue({userName: val.userName});
                    this.profileForm.patchValue({phoneNumber: val.phoneNumber});
                    this.profileForm.patchValue({department: val.departments[0].departmentId});
                    this.profileForm.patchValue({country: val.country});
                    this.profileForm.patchValue({email: val.emailId});
                    this.profileForm.patchValue({tagline: val.tagLine});
                    this.profileForm.patchValue({gender: val.gender});
                    this.profileForm.patchValue({state: val.state});
                    this.profileForm.patchValue({city: val.city});
                    this.profileForm.patchValue({memo: val.memo});
                    this.profileForm.patchValue({languages: val.languages[0].languageId});
                }
            })
    }

    selectCountry(val: any) {
        if (val.value == '') {
            this.notification.info('Please select country');
            this.stateList.length = 0;
            this.cityList.length = 0;
        } else {
            this.singleCountry = val.value
            this.address.getState(val.value).then(response => {
                // @ts-ignore
                this.stateList = response.states
            })
        }
    }
    selectState(val: any) {
        if (val.value == '') {
            this.notification.info('Please select country');
            this.cityList.length = 0;
        } else {
            this.address.getCity(val.value, this.singleCountry).then(response => {
                this.cityList = response
            })
        }
    }

    getLanguage() {
        this.service.getlanguage()
            .subscribe(res=> {
                this.langugeList = res.results;
            })
    }

    findData(country: string, state: string) {
        if (country !== undefined) {
            this.selectCountry({value:country});
        }
        if (state !== undefined){
            this.selectState({value:state});
        }
    }

}
