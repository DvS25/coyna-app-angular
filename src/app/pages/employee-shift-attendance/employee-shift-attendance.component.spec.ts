import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftattComponent } from './employee-shift-attendance.component';

describe('ShiftattComponent', () => {
  let component: ShiftattComponent;
  let fixture: ComponentFixture<ShiftattComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftattComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftattComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
