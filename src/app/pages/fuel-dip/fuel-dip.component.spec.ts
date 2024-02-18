import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FueldipComponent } from './fuel-dip.component';

describe('FueldipComponent', () => {
  let component: FueldipComponent;
  let fixture: ComponentFixture<FueldipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FueldipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FueldipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
