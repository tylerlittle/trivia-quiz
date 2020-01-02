import { Component, OnInit } from '@angular/core';
import { TriviaQuizService } from '../trivia-quiz.service';

@Component({
  selector: 'app-trivia-quiz',
  templateUrl: './trivia-quiz.component.html',
  styleUrls: ['./trivia-quiz.component.css']
})
export class TriviaQuizComponent implements OnInit {
  view = 'categories';
  questionQuantity = 10;
  categories: any = [];
  selectedCategory = '';
  questions = [];
  selectedDifficulty = '';
  difficultyList = ['Any', 'Easy', 'Medium', 'Hard'];
  selectedType = '';
  typeList = ['Any', 'True/False', 'Multiple Choice'];

  constructor(private quizService: TriviaQuizService) { }

  ngOnInit() {
    this.quizService.getTriviaCategories()
    .subscribe((response: any) => { this.categories = response.trivia_categories;
                                    this.sortAlphabetically(this.categories); });
  }

  setSelectedCategory(categoryName: string) {
    this.selectedCategory = categoryName;
    this.view = 'question-quantity';
  }

  setQuestionQuantity() {
    this.view = 'difficulty';
  }

  setSelectedDifficulty(difficultyLevel: string) {
    this.selectedDifficulty = difficultyLevel;
    this.view = 'type';
  }

  setSelectedType(type: string) {
    this.selectedType = type;
    this.view = 'quiz-params';
  }

  onBeginQuiz() {
    const category = this.categories.filter(item => item.name === this.selectedCategory );
    const categoryId = category[0].id;
    this.quizService.getQuestionsForCategory(categoryId, this.questionQuantity, this.selectedDifficulty, this.selectedType)
    .subscribe((response: any) => {
      if (response.results.length === 0) {
        this.view = 'no-questions';
      } else {
        this.view = 'questions';
        this.questions = response.results;
      }
    });
  }

  stepDown() {
    if (this.questionQuantity > 1) {
      this.questionQuantity -= 1;
    }
  }

  stepUp() {
    if (this.questionQuantity < 50) {
      this.questionQuantity += 1;
    }
  }

  sortAlphabetically(array: any) {
    array.sort((a: any, b: any) => {
      const former = a.name.toUpperCase();
      const latter = b.name.toUpperCase();
      return (former < latter) ? -1 : (former > latter) ? 1 : 0;
    });
  }

  returnHome(event: any) {
    this.selectedCategory = '';
    this.selectedDifficulty = '';
    this.selectedType = '';
    this.questions = [];
    this.view = 'categories';
  }
}
