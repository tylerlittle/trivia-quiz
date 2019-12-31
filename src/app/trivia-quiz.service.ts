import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TriviaQuizService {

  constructor(private http: HttpClient) { }

  getTriviaCategories() {
    return this.http.get('https://opentdb.com/api_category.php');
  }

  getQuestionsForCategory(categoryId: number, difficulty: string, type: string) {
    let url = `https://opentdb.com/api.php?amount=10&category=${categoryId}`;
    if (type === 'True/False') {
      url = `${url}&type=boolean`;
    } else if (type === 'Multiple') {
      url = `${url}&type=multiple`;
    }
    if (difficulty !== 'Any') {
      url = `${url}&difficulty=${difficulty.toLowerCase()}`;
    }
    return this.http.get(url);
  }
}
