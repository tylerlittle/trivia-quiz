import { Component, OnInit } from '@angular/core';
import { TriviaQuizService } from '../trivia-quiz.service';

@Component({
  selector: 'app-trivia-quiz',
  templateUrl: './trivia-quiz.component.html',
  styleUrls: ['./trivia-quiz.component.css']
})
export class TriviaQuizComponent implements OnInit {
  view = 'categories';
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
    this.view = 'questions';
    const category = this.categories.filter(item => item.name === this.selectedCategory );
    const categoryId = category[0].id;
    this.quizService.getQuestionsForCategory(categoryId, this.selectedDifficulty, this.selectedType)
    .subscribe((response: any) => { this.questions = response.results;
                                    console.log(this.questions); } );
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
