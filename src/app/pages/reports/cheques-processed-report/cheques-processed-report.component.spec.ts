import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequesProcessedReportComponent } from './cheques-processed-report.component';

describe('ChequesProcessedReportComponent', () => {
  let component: ChequesProcessedReportComponent;
  let fixture: ComponentFixture<ChequesProcessedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChequesProcessedReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChequesProcessedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
