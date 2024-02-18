import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyActivityDComponent } from './daily-activity-d.component';

describe('DailyActivityDComponent', () => {
  let component: DailyActivityDComponent;
  let fixture: ComponentFixture<DailyActivityDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyActivityDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyActivityDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
