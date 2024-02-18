import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostMarginReportComponent } from './cost-margin-report.component';

describe('CostMarginReportComponent', () => {
  let component: CostMarginReportComponent;
  let fixture: ComponentFixture<CostMarginReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostMarginReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostMarginReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
