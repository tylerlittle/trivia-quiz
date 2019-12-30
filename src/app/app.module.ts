import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TriviaQuizComponent } from './trivia-quiz/trivia-quiz.component';
import { TriviaQuizService } from './trivia-quiz.service';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    TriviaQuizComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [TriviaQuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
