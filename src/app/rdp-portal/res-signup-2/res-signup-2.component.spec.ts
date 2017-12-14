import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResSignup2Component } from './res-signup-2.component';

describe('ResSignup2Component', () => {
  let component: ResSignup2Component;
  let fixture: ComponentFixture<ResSignup2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResSignup2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResSignup2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
