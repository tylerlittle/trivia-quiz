import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaQuizComponent } from './trivia-quiz.component';

describe('TriviaQuizComponent', () => {
  let component: TriviaQuizComponent;
  let fixture: ComponentFixture<TriviaQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriviaQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriviaQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
