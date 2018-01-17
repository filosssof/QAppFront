import {ChangeDetectorRef, Component, Inject, NgZone} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {QuestionService} from '../question/question.service';
import {HttpErrorResponse} from '@angular/common/http';
import {PageableAnswer} from '../shared/models/models.interfaces';

@Component({
    selector: 'app-answer-dialog',
    templateUrl: 'answer-dialog.component.html',
    styleUrls: ['answer.component.scss']
})
export class AnswerDialogComponent {
    constructor(public dialogRef: MatDialogRef<AnswerDialogComponent>, private ngZone: NgZone,
                @Inject(MAT_DIALOG_DATA) public data: any, private questionService: QuestionService) {
    }

    public answerContent: string;

    addAnswer() {
        this.data.loading = true;
        this.questionService.addAnswer(this.data.questionId, this.answerContent).subscribe(
            () => {
                this.dialogRef.close();
                this.questionService.getAnswersByQuestionId(this.data.questionId)
                    .subscribe((answers: PageableAnswer) => {
                        this.ngZone.run(() => {
                                this.data.answers = answers.content;
                                this.data.isLoading = false;
                        });

                    });
            },
            (err: HttpErrorResponse) => console.error(err)
        );
    }
}
