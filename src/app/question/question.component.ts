import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() questions = [];
  currentQuestion = '';
  currentQuestionIndex = 0;
  answers = [];
  selectedAnswer = '';
  correctAnswer = '';
  incorrectAnswer = '';
  answerSubmitted = false;

  constructor() { }

  ngOnInit() {
    console.log('QUESTIONS', this.questions);
    this.currentQuestion = this.questions[0].question;
    this.answers = this.shuffleAnswers(this.getAnswers(this.questions[0]));
  }

  getAnswers(question: any) {
    const answers = question.incorrect_answers;
    answers.push(question.correct_answer);
    return answers;
  }

  onAnswerClick($event: any) {
    this.selectedAnswer = $event.srcElement.innerText;
    this.correctAnswer = this.questions[this.currentQuestionIndex].correct_answer;
    if (this.questions[this.currentQuestionIndex].correct_answer !== this.selectedAnswer) {
      this.incorrectAnswer = this.selectedAnswer;
    }
    if (this.questions.length - 1 !== this.currentQuestionIndex) {
      this.answerSubmitted = true;
    }
  }

  onNextBtnClick() {
    this.currentQuestionIndex += 1;
    this.currentQuestion = this.questions[this.currentQuestionIndex].question;
    this.answers = this.shuffleAnswers(this.getAnswers(this.questions[this.currentQuestionIndex]));
    this.selectedAnswer = '';
    this.correctAnswer = '';
    this.incorrectAnswer = '';
    this.answerSubmitted = false;
  }

  shuffleAnswers(answers: any) {
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
