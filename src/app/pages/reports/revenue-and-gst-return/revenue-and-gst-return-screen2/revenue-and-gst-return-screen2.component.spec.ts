import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueAndGstReturnScreen2Component } from './revenue-and-gst-return-screen2.component';

describe('RevenueAndGstReturnScreen2Component', () => {
  let component: RevenueAndGstReturnScreen2Component;
  let fixture: ComponentFixture<RevenueAndGstReturnScreen2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueAndGstReturnScreen2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueAndGstReturnScreen2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
