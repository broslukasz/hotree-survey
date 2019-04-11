import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotreeFormFieldComponent } from './hotree-form-field.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { mock } from 'ts-mockito';

describe('HotreeFormFieldComponent', () => {
  let component: HotreeFormFieldComponent;
  let fixture: ComponentFixture<HotreeFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotreeFormFieldComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotreeFormFieldComponent);
    component = fixture.componentInstance;
    component.hotreeFormField = mock(AbstractControl);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
