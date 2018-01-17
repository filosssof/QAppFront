import {CoreModule} from '../core/core.module';
import {TranslateModule} from '@ngx-translate/core';
import {MaterialModule} from '../material.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from '../shared/shared.module';
import {AnswerDialogComponent} from './answer-dialog.component';
import {FormsModule} from '@angular/forms';
import {QuestionComponent} from '../question/question.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        CoreModule,
        FormsModule,
        SharedModule,
        FlexLayoutModule,
        MaterialModule,
        NgbModule.forRoot()
    ],
    declarations: [
        AnswerDialogComponent
    ],
    providers: [
        QuestionComponent
    ]
})
export class AnswerModule { }
