import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TriviaQuizComponent } from './trivia-quiz/trivia-quiz.component';
import { TriviaQuizService } from './trivia-quiz.service';
import { CardComponent } from './card/card.component';
import { QuestionComponent } from './question/question.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    TriviaQuizComponent,
    CardComponent,
    QuestionComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [TriviaQuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
