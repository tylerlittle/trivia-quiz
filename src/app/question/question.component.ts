import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  // public properties
  @Input() questions = [];
  @Output() viewResults = new EventEmitter();
  answers = [];
  answerSubmitted = false;
  correctAnswer = '';
  currentQuestion = '';
  currentQuestionIndex = 0;
  difficulty: string;
  disableAnswers = false;
  incorrectAnswer = '';
  timeElapsedDisplay = '00:00';
  viewResultsEnabled = false;

  // private fields
  private quizResults = {
    correct: 0,
    incorrect: 0,
    timeElapsedDisplay: '00:00'
  };
  private selectedAnswer = '';
  private timeElapsed = 0;
  private timerInterval: any;

  constructor() {}

  ngOnInit() {
    if (this.questions.length > 0) {
      this.difficulty = this.questions[0].difficulty;
      this.currentQuestion = this.questions[0].question;
      this.answers = this.shuffleAnswers(this.getAnswers(this.questions[0]));
      this.timerInterval = setInterval(() => {
        this.timeElapsed += 1;
        let minutes: any = Math.floor(this.timeElapsed / 60);
        let seconds: any = this.timeElapsed - 60 * minutes;
        if (minutes < 10) {
          minutes = `0${minutes}`;
        }
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
        this.timeElapsedDisplay = `${minutes}:${seconds}`;
      }, 1000);
    }
  }

  // public methods
  onAnswerClick($event: any): void {
    this.disableAnswers = true;
    this.selectedAnswer = $event.srcElement.innerText;
    this.correctAnswer = this.questions[
      this.currentQuestionIndex
    ].correct_answer;
    if (
      this.questions[this.currentQuestionIndex].correct_answer !==
      this.selectedAnswer
    ) {
      this.incorrectAnswer = this.selectedAnswer;
      this.quizResults.incorrect += 1;
    } else {
      this.quizResults.correct += 1;
    }
    if (this.questions.length - 1 !== this.currentQuestionIndex) {
      this.answerSubmitted = true;
    } else {
      clearInterval(this.timerInterval);
      this.quizResults.timeElapsedDisplay = this.timeElapsedDisplay;
      this.viewResultsEnabled = true;
    }
  }

  onNextBtnClick(): void {
    this.disableAnswers = false;
    this.currentQuestionIndex += 1;
    this.difficulty = this.questions[this.currentQuestionIndex].difficulty;
    this.currentQuestion = this.questions[this.currentQuestionIndex].question;
    this.answers = this.shuffleAnswers(
      this.getAnswers(this.questions[this.currentQuestionIndex])
    );
    this.selectedAnswer = '';
    this.correctAnswer = '';
    this.incorrectAnswer = '';
    this.answerSubmitted = false;
  }

  onViewResults(): void {
    this.viewResults.emit(this.quizResults);
  }

  // private methods
  private getAnswers(question: any): any {
    const answers = question.incorrect_answers;
    answers.push(question.correct_answer);
    return answers;
  }

  private shuffleAnswers(answers: any): any {
    // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    let j: number;
    let x: any;
    let i: number;
    for (i = answers.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = answers[i];
      answers[i] = answers[j];
      answers[j] = x;
    }
    return answers;
  }
}
