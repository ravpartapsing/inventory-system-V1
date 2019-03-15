import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenaveComponent } from './sidenave.component';

describe('SidenaveComponent', () => {
  let component: SidenaveComponent;
  let fixture: ComponentFixture<SidenaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
