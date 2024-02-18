import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBillsComponent } from './Add-Bills.component';


describe('vendor-expense', () => {
  let component: AddBillsComponent;
  let fixture: ComponentFixture<AddBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
