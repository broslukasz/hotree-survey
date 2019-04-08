import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventComponent } from './new-event.component';
import { FormBuilder } from '@angular/forms';
import { instance, mock } from 'ts-mockito';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewEventComponent', () => {
  let component: NewEventComponent;
  let fixture: ComponentFixture<NewEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEventComponent ],
      imports: [RouterTestingModule],
      providers: [
        {provide: FormBuilder, useValue: instance(mock(FormBuilder))}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
