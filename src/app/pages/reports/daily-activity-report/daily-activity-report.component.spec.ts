import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyActivityReportComponent } from './daily-activity-report.component';

describe('DailyActivityReportComponent', () => {
  let component: DailyActivityReportComponent;
  let fixture: ComponentFixture<DailyActivityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyActivityReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyActivityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
