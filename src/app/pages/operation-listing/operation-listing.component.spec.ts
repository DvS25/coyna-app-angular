import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationlComponent } from './operation-listing.component';

describe('OperationlComponent', () => {
  let component: OperationlComponent;
  let fixture: ComponentFixture<OperationlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
