import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dailog1Component } from './dailog1.component';

describe('Dailog1Component', () => {
  let component: Dailog1Component;
  let fixture: ComponentFixture<Dailog1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dailog1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dailog1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
