import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemClassificationListComponent } from './item-classification-list.component';

describe('item-classification-list', () => {
  let component: ItemClassificationListComponent;
  let fixture: ComponentFixture<ItemClassificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemClassificationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemClassificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
