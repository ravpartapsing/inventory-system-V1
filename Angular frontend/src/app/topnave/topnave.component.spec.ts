import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopnaveComponent } from './topnave.component';

describe('TopnaveComponent', () => {
  let component: TopnaveComponent;
  let fixture: ComponentFixture<TopnaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopnaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
