import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../core/authentication/authentication.service';
import {Answer, Author, PageableAnswer, PageableQuestion, Question, QuestionFilter} from '../shared/models/models.interfaces';
import {AnswerDialogComponent} from '../answer/answer-dialog.component';
import {QuestionService} from './question.service';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-home',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

    isLoading: boolean;

    questions: Question[];

    question: Question;

    public answers: Answer[];

    filter: QuestionFilter;
    changeDetectorRefs: ChangeDetectorRef[] = [];

    constructor(private questionService: QuestionService,
                private route: ActivatedRoute,
                private authenticationService: AuthenticationService,
                public dialog: MatDialog) {

    }

    public getImgSrcByAuthor(author: Author) {
        const src = 'https://graph.facebook.com/{facebookId}/picture?type=square'
            .replace('{facebookId}', author.facebookId); // TODO verify number of calls
        return src;
    }

    ngOnInit() {
        this.isLoading = true;
        this.route.params.subscribe(params => {
            if (params['id']) {
                this.populateQuestion(params['id']);
                this.populateAnswers(params['id']);
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

    private populateQuestion(id: number) {
        this.questionService.getQuestionById(id).pipe(finalize(() => {
            this.isLoading = false;
        }))
            .subscribe((question: Question) => {
                this.question = question;
            });
    }

    populateAnswers(id: number) {
        this.questionService.getAnswersByQuestionId(id).subscribe((answers: PageableAnswer) => {
            this.answers = answers.content;
            this.isLoading = false;
        });
    }


    openAnswerDialog(): void {
        this.dialog.open(AnswerDialogComponent, {
            width: '350px',
            data: {questionId: this.question.id, answers: this.answers, loading: this.isLoading}
        });
    }

    isAuthenticated(): boolean {
        return this.authenticationService.isAuthenticated();
    }

    tick() {
        this.changeDetectorRefs
            .forEach((ref) => ref.detectChanges());
    }

}
