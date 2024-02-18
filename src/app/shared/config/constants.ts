import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { GetChartOfAccountSetupComponent } from './../../pages/chart-of-account-setup/get-chart-of-account-setup/get-chart-of-account-setup.component';
import { GetDepartmentComponent } from './../../pages/department/get-department/get-department/get-department.component';

@Injectable()
export class Constants {
  url: string = environment.gatewayURL;
  public readonly CIPHER_KEY = '112022$#@$^@1SAW';
  public readonly SET_TOKEN = 'STa2RVzaRkJVrthKHJXfy4Z9CswUJc';
  public readonly SET_USER_RESPONSE = 'r1@UIOPLKhjnKq18qtgaC';
  public readonly SET_PERMISSION_RESPONSE = '';
  public readonly apInvoiceId = '999999934'
  public readonly REGEXP = {
    url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    // charOnly: /^[a-zA-Z0-9]+(([ ][a-zA-Z0-9 ])?[a-zA-Z0-9]*)*$/,
    charOnlyWithSpecialCharacters: /^[ A-Za-z0-9_.,/*"#%!$()&+-]*$/,

    charOnly: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    aToZ: /^[A-Za-z]+([A-Za-z]+)*$/,
    charOnly_1: /^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]\s{1}[a-zA-Z]{1,})$/,

    spaceRemove: /^(?![\s-])/g,
    pattern: /^[a-zA-Z0-9_|,\/?]*$/,
    number: /^[0-9]+$/i,
    alphanumWithQuestionMark: /^[a-zA-Z0-9_ ?]*$/,
    alphanum: /^[a-zA-Z0-9_ ]*$/,
    alphanumWithoutSpace: /^[a-zA-Z0-9_]*$/,
    alphanumWithoutSpaceAndHyphon: /^[a-zA-Z0-9]*$/,
    alphanumWithSpaceDot: /^[a-zA-Z0-9-._ ]*$/,
    curationDisplayNameAlphaNum: /^[\\\]?[a-zA-Z0-9_ !@#$%^&*()/|-]*$/
  };

  public readonly UPLOAD = {
    imageSizeInMB: 1,
    imageSize: 1 * 1048576,
    videoSizeInMB: 50,
    videoSize: 50 * 1048576,
    soundSizeInMB: 10,
    soundSize: 10 * 1048576
  };
  public readonly END_POINT_FOR_MULTIPART: string[] = ['document', 'image', 'upload-logo'];

  public readonly API_FETCH_COUNTRY: string = 'https://countriesnow.space/api/v0.1/countries/positions'
  public readonly API_FETCH_STATE: string = 'https://countriesnow.space/api/v0.1/countries/states'
  public readonly API_FETCH_CITY: string = 'https://countriesnow.space/api/v0.1/countries/state/cities'

  public readonly API_URL_PREFIX: string = 'http://18.60.179.8:8080/payments-control-centre';
  //public readonly API_URL_PREFIX: string = 'http://localhost:8080/payments-control-centre';

  public readonly IS_COMPANY_END_POINT: string = `${this.API_URL_PREFIX}/v1/profile/image`;




  public readonly API_USER_PROFILE_IMAGE: string = `${this.API_URL_PREFIX}/v1/profile/image`;
  public readonly API_USER_PROFILE_Data: string = `${this.API_URL_PREFIX}/v1/profile`;
  public readonly API_ADD_COMPANY_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/company`;
  public readonly API_GET_COMPANY_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/company`;
  public readonly API_GET_ITEM_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/items`;
  public readonly VENDOR_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/vendor`;
  public readonly ADD_VENDOR_DOC_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/document`;
  public readonly DOC_DOWNLOAD_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/document/download`;
  public readonly ARDOCUMENT_DOWNLOAD_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/ar-document`;
  public readonly GET_VENDOR_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/vendor`;
  public readonly ADD_INVOICE_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/ap-invoice`;
  public readonly FILTER_INVOICE_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/ap-invoice?`;
  public readonly GET_INVOICE_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/ap-invoice`;
  public readonly GET_INVOICE_DTL_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/ap-invoice-dtl`;
  public readonly ADD_PAYMENT_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/ap-payment`;
  public readonly STORE_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/store`;
  public readonly ADD_EXPENSE_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/expense`;
  public readonly COMPANY_VENDOR_ASSOCIATION: string = `${this.API_URL_PREFIX}/v1/company-vendor`;
  public readonly ADD_TIME_SHEET_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/timesheet`;
  public readonly API_OPERATION_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/profile/operation-user`;
  public readonly OPERATION_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/users`;
  public readonly API_USER_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/users/add`;
  public readonly API_USER_RE_INVITE_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/users/invite`;
  public readonly API_FINANCE_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/profile/finance-user`;
  public readonly API_LANGUAGE_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/language`;
  public readonly API_DEPARTMENT_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/department`;
  public readonly UPDATE_PROFILE_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/profile`;
  public readonly SHIFT_SHEET_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/item`;
  public readonly SHIFT_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/shift`;
  public readonly CATEGORY_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/category`;
  public readonly REPORT_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/report`;
  public readonly API_LOGIN_ENDPOINT: string = `${this.API_URL_PREFIX}/authenticate`;
  public readonly API_USER_REGISTER_END_POINT: string = `${this.API_URL_PREFIX}/v1/user-account/register`;

  public readonly SHIFT_END_POINT: string = `${this.API_URL_PREFIX}/v1/ar-invoice`;
  public readonly ARINVOICE_DTL_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/ar-invoice-dtl`;
  public readonly ADD_SEASONAL_ITEM: string = `${this.API_URL_PREFIX}/v1/item/addSeasonalItem`;
  public readonly INACTIVE_SEASONAL_ITEM: string = `${this.API_URL_PREFIX}/v1/item`;

  public readonly GET_SHIFT_SUMMARY_END_POINT: string = `${this.API_URL_PREFIX}/v1/ar-invoice/summary`;


  public readonly API_GET_KNOCKOFF_SUMMARY_REPORT_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/report?type=knockoff-report`;
  public readonly API_GET_COMMON_REPORT_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/report`;


  public readonly TIME_SHEET_EMPLOYEE: string = `${this.API_URL_PREFIX}/v1/users?searchParameters=user_type&searchValues=OPERATION`;


  public readonly TOKEN_VERIFY_ENDPOINT: string = `${this.url}/api/authentication/token-verify`;
  public readonly LOGOUT_ENDPOINT: string = `${this.url}/api/authentication/logout`;
  public readonly SESSION_LOGOUT_ENDPOINT: string = `${this.url}/api/authentication/all-session-logout`;
  public readonly FORGOT_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/user-account/forgot-password`;
  public readonly RESET_PASSWORD: string = `${this.API_URL_PREFIX}/v1/user-account/reset-password`;

  public readonly BANK_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/bank`;
  public readonly BANKTRANSACTIONS_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/bank-transaction`;
  public readonly PERMISSION_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/permission`;
  public readonly ROLE_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/role`;
  public readonly USERTYPE_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/metadata/user-type`;
  public readonly CUSTOMER_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/customer`;
  public readonly COYNA_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/metadata/use-coyna`;
  public readonly PAST_FINANCE_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/metadata/past-finance`;
  public readonly TAX_STRUCTURE_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/metadata/tax-structure`;
  public readonly DESTINATION_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/metadata/designation`;
  public readonly INDUSTRY_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/metadata/industry`;
  public readonly CURRENCY_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/metadata/currency`;
  public readonly PAYMENT_TERM_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/metadata/payment-terms`;
  public readonly ACCOUNTING_METHOD_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/metadata/accounting-method`;
  public readonly Country_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/metadata/country`;
  public readonly STATE_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/metadata/state`;
  public readonly CITY_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/metadata/city`;

  //COA
  public readonly API_GET_CHART_OF_ACCOUNT_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/coa-company`;
  public readonly API_GET_ACCOUNT_TYPE_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/coa-type/parents`;
  public readonly API_GET_DETAIL_TYPE_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/coa-type/children`;
  public readonly API_ADD_CHART_OF_ACCOUNT_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/coa-company`;

  //Department
  public readonly DEPARTMENT_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/department`;

  //Journal
  public readonly ADD_JOURNAL_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/transaction`;
  public readonly DELETE_JOURNAL_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/transaction-dtl`;
  public readonly UPLOAD_JOURNAL_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/transaction-document`;
  public readonly DOWNLOAD_DOCUMENT_JOURNAL_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/transaction-document`;
  
  //Transaction
  public readonly TRANSACTION_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/transaction`;

  // Product and Service
  public readonly PRODUCT_SERVICE_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/items`;
  public readonly DELETE_PRODUCT_SERVICE_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/items`;
  public readonly INCOME_ACCOUNT_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/coa-company`;
  public readonly PRODUCT_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/items`;
  public readonly SERVICE_ENDPOINT: string = `${this.API_URL_PREFIX}/v1/items`;

  // Expense and vendor
  public readonly PAYMENTSCONTROLCENTRE: string = `${this.API_URL_PREFIX}/v1/transaction`;
  public readonly REPORTPAYMENTSCONTROLCENTRE: string = `${this.API_URL_PREFIX}/v1/export/transactions`;
  public readonly GET_VEN_DORDROPDOWN: string = `${this.API_URL_PREFIX}/v1`;
  public readonly PAYMENT_ACCOUNT: string = `${this.API_URL_PREFIX}/v1`;
  public readonly DEPARTMENT: string = `${this.API_URL_PREFIX}/v1`;
  public readonly ITEMS: string = `${this.API_URL_PREFIX}/v1`;
  public readonly API_SAVE_EXPENSE: string = `${this.API_URL_PREFIX}/v1/transaction`;
  public readonly API_SAVE_EDIT: string = `${this.API_URL_PREFIX}/v1/transaction/`;
  public readonly API_VENROT_LIST: string = `${this.API_URL_PREFIX}/v1/`;
  public readonly DELETE_Expense: string = `${this.API_URL_PREFIX}/v1/transaction/`;



}


