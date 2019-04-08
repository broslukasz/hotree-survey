import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventComponent } from './new-event.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { instance, mock } from 'ts-mockito';
import { RouterTestingModule } from '@angular/router/testing';
import { NewEventService } from './new-event.service';

describe('NewEventComponent', () => {
  let component: NewEventComponent;
  let fixture: ComponentFixture<NewEventComponent>;

  const formBuilder: FormBuilder = new FormBuilder();
  let newEventService: NewEventService;

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
    component.newEventForm = formBuilder.group({
      title: ''
    });
    newEventService = fixture.debugElement.injector.get(NewEventService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should log output of the survey to the console', () => {
    // Arrange
    spyOn(newEventService, 'logFormOutputToConsole').and.callThrough();
    component.newEventForm.get('title').setValue('Sample Title');
    // Assert
    component.onSubmit();

    // Expect
    expect(newEventService.logFormOutputToConsole).toHaveBeenCalled();
  });

  fit('should check validation if untoched for submitted', () => {
    // Arrange
    spyOn(newEventService, 'checkFormValidation').and.callThrough();
    // Assert
    component.onSubmit();

    // Expect
    expect(newEventService.checkFormValidation).toHaveBeenCalled();
  });

  fit('should not explicitly check validation if valid form submitted', () => {
    // Arrange
    spyOn(newEventService, 'checkFormValidation').and.callThrough();
    component.newEventForm.get('title').setValue('Sample Title');
    // Assert
    component.onSubmit();

    // Expect
    expect(newEventService.checkFormValidation).not.toHaveBeenCalled();
  });
});
