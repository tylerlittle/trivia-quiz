import { TestBed } from '@angular/core/testing';

import { TriviaQuizService } from './trivia-quiz.service';

describe('TriviaQuizService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TriviaQuizService = TestBed.get(TriviaQuizService);
    expect(service).toBeTruthy();
  });
});
