import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventComponent } from './new-event.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { instance, mock } from 'ts-mockito';
import { RouterTestingModule } from '@angular/router/testing';
import { NewEventService } from './new-event.service';
import { Router } from '@angular/router';
import { NewEventFormField } from './new-event-form-fields';

describe('NewEventComponent', () => {
  let component: NewEventComponent;
  let fixture: ComponentFixture<NewEventComponent>;

  const formBuilder: FormBuilder = new FormBuilder();
  const validForm = {
    title: 'Simple Title'
  };
  let newEventService: NewEventService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEventComponent ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: FormBuilder, useValue: instance(mock(FormBuilder))}
      ]
    }).overrideComponent(NewEventComponent, {
      set: {
        providers: [
          { provide: NewEventService, useValue: instance(mock(NewEventService))}
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

  it('should check validation if untoched for submitted', () => {
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
});
