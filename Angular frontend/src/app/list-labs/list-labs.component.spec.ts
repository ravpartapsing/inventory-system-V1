import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLabsComponent } from './list-labs.component';

describe('ListLabsComponent', () => {
  let component: ListLabsComponent;
  let fixture: ComponentFixture<ListLabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
