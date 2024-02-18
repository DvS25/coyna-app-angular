import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueAndGstReturnComponent } from './revenue-and-gst-return.component';

describe('RevenueAndGstReturnComponent', () => {
  let component: RevenueAndGstReturnComponent;
  let fixture: ComponentFixture<RevenueAndGstReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueAndGstReturnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueAndGstReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
