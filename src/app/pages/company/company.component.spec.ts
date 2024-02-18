import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanylComponent } from './company.component';

describe('CompanylComponent', () => {
  let component: CompanylComponent;
  let fixture: ComponentFixture<CompanylComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanylComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanylComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
