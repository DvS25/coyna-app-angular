import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueAndGstReturnDescriptionComponent } from './revenue-and-gst-return-description.component';

describe('RevenueAndGstReturnDescriptionComponent', () => {
  let component: RevenueAndGstReturnDescriptionComponent;
  let fixture: ComponentFixture<RevenueAndGstReturnDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueAndGstReturnDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueAndGstReturnDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
