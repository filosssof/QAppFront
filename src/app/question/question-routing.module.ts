import {extract} from '../core/i18n.service';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {Route} from '../core/route.service';
import {QuestionComponent} from './question.component';

const routes: Routes = Route.withShell([
    { path: 'question/:id', component: QuestionComponent, data: { title: extract('About') } }
]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class QuestionRoutingModule { }
