import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorderComponent } from './processorder.component';

describe('ProcessorderComponent', () => {
  let component: ProcessorderComponent;
  let fixture: ComponentFixture<ProcessorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
