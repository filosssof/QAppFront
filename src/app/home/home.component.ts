import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import {PageableQuestion, QuestionFilter, QuestionService} from '../question/question.service';
import {Question} from '../question/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading: boolean;

  questions: Question[];

  filter: QuestionFilter;

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.isLoading = true;
    this.questionService.getListOfQuestions(this.filter)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((pageableQuestions: PageableQuestion) => { this.questions = pageableQuestions.content;
      });


  }

}
