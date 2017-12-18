import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material.module';
import {QuestionService} from './question.service';
import {QuestionComponent} from './question.component';
import {QuestionRoutingModule} from './question-routing.module';


@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        CoreModule,
        SharedModule,
        FlexLayoutModule,
        MaterialModule,
        QuestionRoutingModule
    ],
    declarations: [
        QuestionComponent
    ],
    providers: [
        QuestionService
    ]
})
export class QuestionModule { }
