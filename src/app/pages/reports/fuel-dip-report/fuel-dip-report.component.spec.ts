import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelDipReportComponent } from './fuel-dip-report.component';

describe('FuelDipReportComponent', () => {
  let component: FuelDipReportComponent;
  let fixture: ComponentFixture<FuelDipReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelDipReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelDipReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
