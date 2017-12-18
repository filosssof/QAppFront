import {PageableQuestion, Question, QuestionFilter, QuestionService} from './question.service';
import {Component, OnInit} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

    isLoading: boolean;

    questions: Question[];

    question: Question;

    filter: QuestionFilter;

    constructor(private questionService: QuestionService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.isLoading = true;
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.questionService.getQuestionById(params['id']).pipe(finalize(() => {
                    this.isLoading = false
                }))
                    .subscribe((question: Question) => {
                        this.question = question;
                    });
            } else {
                this.questionService.getListOfQuestions(this.filter)
                    .pipe(finalize(() => {
                        this.isLoading = false;
                    }))
                    .subscribe((pageableQuestions: PageableQuestion) => {
                        this.questions = pageableQuestions.content;
                        console.log(this.questions);
                    });
            }
        });

    }

}
