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
}
