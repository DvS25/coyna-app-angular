import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AFinanceComponent } from './finance-listing.component';

describe('AFinanceComponent', () => {
  let component: AFinanceComponent;
  let fixture: ComponentFixture<AFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AFinanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
