import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateItemComponent } from './add-update-item.component';

describe('AddUpdateItemComponent', () => {
  let component: AddUpdateItemComponent;
  let fixture: ComponentFixture<AddUpdateItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
