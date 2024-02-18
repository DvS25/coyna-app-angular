import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyActivityPComponent } from './daily-activity-p.component';

describe('DailyActivityPComponent', () => {
  let component: DailyActivityPComponent;
  let fixture: ComponentFixture<DailyActivityPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyActivityPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyActivityPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
