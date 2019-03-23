import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmylabsComponent } from './listmylabs.component';

describe('ListmylabsComponent', () => {
  let component: ListmylabsComponent;
  let fixture: ComponentFixture<ListmylabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListmylabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmylabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
