import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateLabComponent } from './add-update-lab.component';

describe('AddUpdateLabComponent', () => {
  let component: AddUpdateLabComponent;
  let fixture: ComponentFixture<AddUpdateLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
