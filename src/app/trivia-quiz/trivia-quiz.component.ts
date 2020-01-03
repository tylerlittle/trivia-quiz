import { Component, OnInit } from '@angular/core';
import { TriviaQuizService } from '../trivia-quiz.service';

@Component({
  selector: 'app-trivia-quiz',
  templateUrl: './trivia-quiz.component.html',
  styleUrls: ['./trivia-quiz.component.css']
})
export class TriviaQuizComponent implements OnInit {
  // public properties
  categories: any = [];
  difficultyList = ['Any', 'Easy', 'Medium', 'Hard'];
  questionQuantity = 5;
  questions = [];
  quizResults: any;
  selectedCategory = '';
  selectedDifficulty = '';
  selectedType = '';
  typeList = ['Any', 'True/False', 'Multiple Choice'];
  view = 'categories';

  // private fields
  private stepIntervalHandler: any;
  private stepTimeoutHandler: any;

  constructor(private quizService: TriviaQuizService) {}

  ngOnInit() {
    this.getCategories();
  }

  // public methods
  clearStepHandlers(): void {
    clearTimeout(this.stepTimeoutHandler);
    clearInterval(this.stepIntervalHandler);
  }

  onBeginQuiz(): void {
    const category = this.categories.filter(
      (item: { name: string }) => item.name === this.selectedCategory
    );
    const categoryId = category[0].id;
    this.quizService
      .getQuestionsForCategory(
        categoryId,
        this.questionQuantity,
        this.selectedDifficulty,
        this.selectedType
      )
      .subscribe((response: any) => {
        if (response.results.length === 0) {
          this.view = 'no-questions';
        } else {
          this.view = 'questions';
          this.questions = response.results;
        }
      });
  }

  onReturnHome(): void {
    this.questions = [];
    this.selectedCategory = '';
    this.selectedDifficulty = '';
    this.selectedType = '';
    this.view = 'categories';
  }

  onViewResults(results: any): void {
    this.quizResults = results;
    this.view = 'results';
  }

  setQuestionQuantity(): void {
    this.view = 'difficulty';
  }

  setSelectedCategory(categoryName: string): void {
    this.selectedCategory = categoryName;
    this.view = 'question-quantity';
  }

  setSelectedDifficulty(difficultyLevel: string): void {
    this.selectedDifficulty = difficultyLevel;
    this.view = 'type';
  }

  setSelectedType(type: string): void {
    this.selectedType = type;
    this.view = 'quiz-params';
  }

  stepDownMouseDown(): void {
    if (this.questionQuantity > 1) {
      this.questionQuantity -= 1;
      this.stepTimeoutHandler = setTimeout(() => {
        this.stepIntervalHandler = setInterval(() => {
          if (this.questionQuantity > 1) {
            this.questionQuantity -= 1;
          }
        }, 50);
      }, 500);
    }
  }

  stepUpMouseDown(): void {
    if (this.questionQuantity < 50) {
      this.questionQuantity += 1;
      this.stepTimeoutHandler = setTimeout(() => {
        this.stepIntervalHandler = setInterval(() => {
          if (this.questionQuantity < 50) {
            this.questionQuantity += 1;
          }
        }, 50);
      }, 500);
    }
  }

  // private methods
  private getCategories(): void {
    this.quizService.getTriviaCategories().subscribe((response: any) => {
      this.categories = response.trivia_categories;
      this.sortAlphabetically(this.categories);
    });
  }

  private sortAlphabetically(array: any): any {
    array.sort((a: any, b: any) => {
      const former = a.name.toUpperCase();
      const latter = b.name.toUpperCase();
      return former < latter ? -1 : former > latter ? 1 : 0;
    });
  }
}
