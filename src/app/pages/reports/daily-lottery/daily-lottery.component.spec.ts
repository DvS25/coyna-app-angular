import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyLotteryComponent } from './daily-lottery.component';

describe('DailyLotteryComponent', () => {
  let component: DailyLotteryComponent;
  let fixture: ComponentFixture<DailyLotteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyLotteryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyLotteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
