import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnockoffSummaryComponent } from './knockoff-summary.component';

describe('KnockoffSummaryComponent', () => {
  let component: KnockoffSummaryComponent;
  let fixture: ComponentFixture<KnockoffSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnockoffSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnockoffSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
