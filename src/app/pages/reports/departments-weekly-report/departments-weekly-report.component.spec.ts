import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsWeeklyReportComponent } from './departments-weekly-report.component';

describe('DepartmentsWeeklyReportComponent', () => {
  let component: DepartmentsWeeklyReportComponent;
  let fixture: ComponentFixture<DepartmentsWeeklyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentsWeeklyReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsWeeklyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
