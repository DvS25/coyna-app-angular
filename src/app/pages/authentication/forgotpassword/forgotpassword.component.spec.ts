import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswodComponent } from './forgotpasswod.component';

describe('ForgotpasswodComponent', () => {
  let component: ForgotpasswodComponent;
  let fixture: ComponentFixture<ForgotpasswodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotpasswodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotpasswodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
