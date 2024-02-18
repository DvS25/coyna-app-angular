import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnPaidComponent } from './un-paid.component';


describe('vendor-expense', () => {
  let component: UnPaidComponent;
  let fixture: ComponentFixture<UnPaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnPaidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
