import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayableAnalysisComponent } from './payable-analysis.component';

describe('PayableAnalysisComponent', () => {
  let component: PayableAnalysisComponent;
  let fixture: ComponentFixture<PayableAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayableAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayableAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
