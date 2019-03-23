import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListlabitemComponent } from './listlabitem.component';

describe('ListlabitemComponent', () => {
  let component: ListlabitemComponent;
  let fixture: ComponentFixture<ListlabitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListlabitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListlabitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
