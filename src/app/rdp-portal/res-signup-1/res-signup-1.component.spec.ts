import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResSignup1Component } from './res-signup-1.component';

describe('ResSignup1Component', () => {
  let component: ResSignup1Component;
  let fixture: ComponentFixture<ResSignup1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResSignup1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResSignup1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
