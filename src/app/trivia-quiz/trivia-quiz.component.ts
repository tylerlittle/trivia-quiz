import { Component, OnInit } from '@angular/core';
import { TriviaQuizService } from '../trivia-quiz.service';

@Component({
  selector: 'app-trivia-quiz',
  templateUrl: './trivia-quiz.component.html',
  styleUrls: ['./trivia-quiz.component.css']
})
export class TriviaQuizComponent implements OnInit {
  categories: any = [];
  selectedCategory = '';
  constructor(private quizService: TriviaQuizService) { }

  ngOnInit() {
    this.quizService.getTriviaCategories()
    .subscribe((response: any) => { this.categories = response.trivia_categories;
                                    this.sortAlphabetically(this.categories); });
  }

  setSelectedCategory(categoryName: string) {
    this.selectedCategory = categoryName;
  }

  sortAlphabetically(array: any) {
    array.sort((a: any, b: any) => {
      const former = a.name.toUpperCase();
      const latter = b.name.toUpperCase();
      return (former < latter) ? -1 : (former > latter) ? 1 : 0;
    });
  }
}
