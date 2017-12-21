import {Component, OnInit} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../core/authentication/authentication.service';
import {Author, PageableQuestion, Question} from '../shared/models/models.interfaces';
import {QuestionFilter, QuestionService} from './question.service';

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

    constructor(private questionService: QuestionService,
                private route: ActivatedRoute,
                private authenticationService: AuthenticationService) {
    }

    public getImgSrcByAuthor(author: Author) {
        const src = 'https://graph.facebook.com/{facebookId}/picture?type=square'
            .replace('{facebookId}', author.facebookId);
        console.log(author);
        return src;
    }

    ngOnInit() {
        this.isLoading = true;
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.questionService.getQuestionById(params['id']).pipe(finalize(() => {
                    this.isLoading = false;
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

    isAuthenticated(): boolean {
        return this.authenticationService.isAuthenticated();
    }

}
