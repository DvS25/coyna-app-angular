import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms';
import { BrowserDB, CompanyService, Constants, InvoiceManagementService, blobFileDownload, unquieArray, UtilityHelper } from "../../shared";
import { ToastrService } from 'ngx-toastr';
import alasql from 'alasql';
import * as moment from 'moment';
import {
	ChartComponent,
	ApexAxisChartSeries,
	ApexChart,
	ApexXAxis,
	ApexDataLabels,
	ApexStroke,
	ApexMarkers,
	ApexYAxis,
	ApexGrid,
	ApexTitleSubtitle,
	ApexLegend
} from "ng-apexcharts";
import { AdminComponent } from 'src/app/layouts/admin/admin.component';

export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	stroke: ApexStroke;
	dataLabels: ApexDataLabels;
	markers: ApexMarkers;
	colors: string[];
	yaxis: ApexYAxis;
	grid: ApexGrid;
	legend: ApexLegend;
	title: ApexTitleSubtitle;
};

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
	dbForm: FormGroup = new FormGroup({});
	showPage: boolean = true;
	userPermissions = this.browserDB.getLocalStorage(this.constants.SET_PERMISSION_RESPONSE);

	@ViewChild("chart") chart!: ChartComponent;
	chartOptions!: Partial<ChartOptions>;

	companyList: any;
	storeList: any = [];
	itemGridUltra: any = 0;
	itemGridRegular: any = 0;
	itemGridSuperClean: any = 0;
	itemGridPlus: any = 0;

	constructor(
		private browserDB: BrowserDB,
		private constants: Constants,
		private formBuilder: FormBuilder,
		private companyService: CompanyService,
		private toastr: ToastrService,
		private utility: UtilityHelper,
		private AdminComponent: AdminComponent
	) {
		this.getCompanies();
		this.filterSearch();

		this.chartOptions = {
			series: [
				{
					name: "Sales Volume",
					data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				}
			],
			chart: {
				height: 350,
				type: "line",
				dropShadow: {
					enabled: true,
					color: "#000",
					top: 18,
					left: 7,
					blur: 10,
					opacity: 0.2
				},
				toolbar: {
					show: false
				}
			},
			colors: ["#77B6EA", "#545454"],
			dataLabels: {
				enabled: true
			},
			stroke: {
				curve: "smooth"
			},
			title: {
				text: "From Sales Performance May Data",
				align: "left"
			},
			grid: {
				borderColor: "#e7e7e7",
				row: {
					colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
					opacity: 0.5
				}
			},
			markers: {
				size: 1
			},
			xaxis: {
				categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				title: {
					text: "Month"
				}
			},
			yaxis: {
				title: {
					text: "Sales"
				}/*,
				min: 5,
				max: 40*/
			},
			legend: {
				position: "top",
				horizontalAlign: "right",
				floating: true,
				offsetY: -25,
				offsetX: -5
			}
		};
	}

	ngOnInit() {
		/*var pagename = "Dashboard"; var perfound = false;
		for(var i = 0 ; i < this.userPermissions.length ; i++)
		{
			if(pagename == this.userPermissions[i].permissionName)
			{
				perfound = true;break;
			}
		}
		if(perfound == false)
		{			
			this.showPage = false;
		}*/
		if (!this.utility.chkPagePermission('Dashboard')) {
			this.showPage = false;
		}
		this.AdminComponent.SetTitle('Dashboard');

	}

	filterSearchForm = this.formBuilder.group({
		companyId: [''],
		storeId: [''],
		startDate: [moment(new Date()).add(-1, 'years').format("YYYY-MM-DD")],
		endDate: [moment(new Date()).format("YYYY-MM-DD")]
	})

	getCompanies() {
		this.companyService.getCompany().subscribe(res => {
			if (res.code == '1') {
				this.companyList = res.results;
			}
		})
	}

	getStores(val: any) {
		//console.log(val)
		this.storeList = [];
		if (val.value == "") {
			return;
		}
		this.companyService.getStore(val.value).subscribe(res => {
			if (res.code == '1') {
				this.storeList = res.results;
			}
		})
	}

	filterSearch() {
		this.getItemGridDatas();
	}

	getItemGridDatas() {
		var params = '';
		var values = '';

		params = params + ",year";
		values = values + ",2023";

		if (this.filterSearchForm.value.companyId != '' && this.filterSearchForm.value.companyId != null) {
			params = params + ",company-id";
			values = values + "," + this.filterSearchForm.value.companyId;
		}
		if (this.filterSearchForm.value.storeId != '' && this.filterSearchForm.value.storeId != null) {
			params = params + ",store-id";
			values = values + "," + this.filterSearchForm.value.storeId;
		}

		var sdate = false; var edate = false;
		if (this.filterSearchForm.value.startDate != '' && this.filterSearchForm.value.startDate != null) {
			sdate = true;
			params = params + ",start-date";
			values = values + "," + this.filterSearchForm.value.startDate;
		}
		if (this.filterSearchForm.value.endDate != '' && this.filterSearchForm.value.endDate != null) {
			edate = true;
			params = params + ",end-date";
			values = values + "," + this.filterSearchForm.value.endDate;
		}

		if (sdate == true && edate == true) {
			if (moment(this.filterSearchForm.value.startDate) > moment(this.filterSearchForm.value.endDate)) {
				this.toastr.error('Start Date Should Be Less Than End Date.');
				return;
			}
		}

		if (params != '') {
			params = params.substr(1);
			values = values.substr(1);
		}

		this.companyService.fetchReport('dashboard-fuelsalesqty-report', params, values).subscribe(res => {
			if (res.code == "1") {
				console.log(res.results);
				for (var i in res.results) {
					if (res.results[i].itemName == "ultra") {
						this.itemGridUltra = res.results[i].qty
					}
					if (res.results[i].itemName == "super") {
						this.itemGridSuperClean = res.results[i].qty
					}
					if (res.results[i].itemName == "diesel") {
						this.itemGridPlus = res.results[i].qty
					}
					if (res.results[i].itemName == "regular") {
						this.itemGridRegular = res.results[i].qty
					}
				}
				console.log("Hello", this.itemGridUltra);


				params = '';
				values = '';
				params = params + ",year";
				values = values + ",2023";

				if (this.filterSearchForm.value.companyId != '' && this.filterSearchForm.value.companyId != null) {
					params = params + ",company-id";
					values = values + "," + this.filterSearchForm.value.companyId;
				}
				if (this.filterSearchForm.value.storeId != '' && this.filterSearchForm.value.storeId != null) {
					params = params + ",store-id";
					values = values + "," + this.filterSearchForm.value.storeId;
				}
				params = params + ",month";
				values = values + ",5";

				this.companyService.fetchReport('salesperformance-report', params, values).subscribe(ress => {
					if (ress.code == "1") {
						console.log(ress.results);
						var arr = alasql('SELECT SUM([total]) AS tot FROM ?', [ress.results]);
						var mayval = 0;
						if (arr.length > 0) {
							mayval = arr[0].tot;
						}

						this.chartOptions = {
							series: [
								{
									name: "Sales Volume",
									data: [100, 200, 300, 400, mayval, 500, 600, 700, 800, 900, 100, 200]
								}
							],
							chart: {
								height: 350,
								type: "line",
								dropShadow: {
									enabled: true,
									color: "#000",
									top: 18,
									left: 7,
									blur: 10,
									opacity: 0.2
								},
								toolbar: {
									show: false
								}
							},
							colors: ["#77B6EA", "#545454"],
							dataLabels: {
								enabled: true
							},
							stroke: {
								curve: "smooth"
							},
							title: {
								text: "From Sales Performance May Data",
								align: "left"
							},
							grid: {
								borderColor: "#e7e7e7",
								row: {
									colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
									opacity: 0.5
								}
							},
							markers: {
								size: 1
							},
							xaxis: {
								categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
								title: {
									text: "Month"
								}
							},
							yaxis: {
								title: {
									text: "Sales"
								}
							},
							legend: {
								position: "top",
								horizontalAlign: "right",
								floating: true,
								offsetY: -25,
								offsetX: -5
							}
						};
					}
				})
			}
		})
	}
}
