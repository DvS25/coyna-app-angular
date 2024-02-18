import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerinvoiceComponent } from './edit-customerinvoice.component';

describe('EditCustomerinvoiceComponent', () => {
  let component: EditCustomerinvoiceComponent;
  let fixture: ComponentFixture<EditCustomerinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCustomerinvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCustomerinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
