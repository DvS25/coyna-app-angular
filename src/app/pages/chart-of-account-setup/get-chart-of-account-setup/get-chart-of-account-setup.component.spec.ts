import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetChartOfAccountSetupComponent } from './get-chart-of-account-setup.component';

describe('GetChartOfAccountSetupComponent', () => {
  let component: GetChartOfAccountSetupComponent;
  let fixture: ComponentFixture<GetChartOfAccountSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetChartOfAccountSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetChartOfAccountSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
