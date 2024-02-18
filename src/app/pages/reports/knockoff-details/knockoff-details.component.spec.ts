import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnockoffDetailsComponent } from './knockoff-details.component';

describe('KnockoffDetailsComponent', () => {
  let component: KnockoffDetailsComponent;
  let fixture: ComponentFixture<KnockoffDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnockoffDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnockoffDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
