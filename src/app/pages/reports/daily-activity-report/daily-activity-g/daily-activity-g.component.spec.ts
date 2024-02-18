import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyActivityGComponent } from './daily-activity-g.component';

describe('DailyActivityGComponent', () => {
  let component: DailyActivityGComponent;
  let fixture: ComponentFixture<DailyActivityGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyActivityGComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyActivityGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
