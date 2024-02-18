import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionManagemenComponent } from './subscription-management.component';

describe('SubscriptionManagemenComponent', () => {
  let component: SubscriptionManagemenComponent;
  let fixture: ComponentFixture<SubscriptionManagemenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscriptionManagemenComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SubscriptionManagemenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
