import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChartOfAccountSetupComponent } from './add-chart-of-account-setup.component';

describe('AddChartOfAccountSetupComponent', () => {
  let component: AddChartOfAccountSetupComponent;
  let fixture: ComponentFixture<AddChartOfAccountSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChartOfAccountSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChartOfAccountSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
