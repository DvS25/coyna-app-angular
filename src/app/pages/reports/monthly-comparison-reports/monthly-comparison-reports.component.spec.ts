import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyComparisonReportsComponent } from './monthly-comparison-reports.component';

describe('MonthlyComparisonReportsComponent', () => {
  let component: MonthlyComparisonReportsComponent;
  let fixture: ComponentFixture<MonthlyComparisonReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyComparisonReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyComparisonReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
