import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventComponent } from './new-event.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { instance, mock } from 'ts-mockito';
import { RouterTestingModule } from '@angular/router/testing';
import { NewEventService } from './services/new-event.service';
import { Router } from '@angular/router';
import { NewEventFormField } from './new-event-form-fields';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SummaryComponent } from '../summary/summary.component';
import { NewEventDataService } from './services/new-event-data.service';
import { AuthService } from '../../auth/auth.service';

describe('NewEventComponent', () => {
  let component: NewEventComponent;
  let fixture: ComponentFixture<NewEventComponent>;

  const formBuilder: FormBuilder = new FormBuilder();
  const validForm = {
    title: ['Simple title', Validators.required],
    description: ['Sample description', Validators.required],
    category: [['category1', 'category2']],
    payment: true,
    event_fee: null,
    reward: null,
    coordinator: '',
    email: '',
    duration: null,
  };
  let newEventService: NewEventService;
  let newEventDataService: NewEventDataService;
  let authService: AuthService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewEventComponent,
        SummaryComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'summary', component: SummaryComponent}
        ]),
        ReactiveFormsModule
      ],
      providers: [
        {provide: FormBuilder, useValue: instance(mock(FormBuilder))},
        AuthService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).overrideComponent(NewEventComponent, {
      set: {
        providers: [
          { provide: NewEventService, useValue: instance(mock(NewEventService))},
          { provide: NewEventDataService, useValue: instance(mock(NewEventDataService))},
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEventComponent);
    component = fixture.componentInstance;
    component.newEventForm = formBuilder.group(validForm);
    newEventService = fixture.debugElement.injector.get(NewEventService);
    newEventDataService = fixture.debugElement.injector.get(NewEventDataService);
    authService = TestBed.get(AuthService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log output of the survey to the console', () => {
    // Arrange
    spyOn(newEventService, 'logFormOutputToConsole').and.callThrough();
    // Assert
    component.onSubmit();

    // Expect
    expect(newEventService.logFormOutputToConsole).toHaveBeenCalled();
  });

  it('should check validation if invalid form submitted', () => {
    // Arrange
    spyOn(newEventService, 'checkFormValidation').and.callThrough();
    component.newEventForm.get(NewEventFormField.title).setValue('');

    // Assert
    component.onSubmit();

    // Expect
    expect(newEventService.checkFormValidation).toHaveBeenCalled();
  });

  it('should not explicitly check validation if valid form submitted', () => {
    // Arrange
    spyOn(newEventService, 'checkFormValidation').and.callThrough();
    // Assert
    component.onSubmit();

    // Expect
    expect(newEventService.checkFormValidation).not.toHaveBeenCalled();
  });

  it('should navigate to summary if submitted form is valid', () => {
    // Arrange
    router = TestBed.get(Router);
    spyOn(router, 'navigate');
    // Assert
    component.onSubmit();

    // Expect
    expect(router.navigate).toHaveBeenCalledWith(['summary']);
  });

  it('should reset event fee when free event clicked', () => {
    // Arrange
    component.newEventForm.get(NewEventFormField.event_fee).setValue(10);
    // Assert
    component.resetEventFee();

    // Expect
    expect(component.event_fee.value).toBe(null);
  });
});
