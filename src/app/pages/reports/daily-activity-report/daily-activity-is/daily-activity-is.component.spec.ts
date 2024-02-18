import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyActivityISComponent } from './daily-activity-is.component';

describe('DailyActivityISComponent', () => {
  let component: DailyActivityISComponent;
  let fixture: ComponentFixture<DailyActivityISComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyActivityISComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyActivityISComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
