import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {PageableAnswer, PageableQuestion, Question, QuestionFilter} from '../shared/models/models.interfaces';
import {AuthenticationService} from '../core/authentication/authentication.service';

const routes = {
    questionsPath: `http://localhost:8080/questions`
};


@Injectable()
export class QuestionService {

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    }

    getListOfQuestions(filter: QuestionFilter): Observable<PageableQuestion> {
        return this.http.get<PageableQuestion>(routes.questionsPath).map((data: PageableQuestion) => {
            return data;
        }, (err: HttpErrorResponse) => {
            console.error(err.message);
        });
    }

    getQuestionById(id: number): Observable<Question> {
        return this.http.get<Question>(routes.questionsPath + '/' + id).map((data: Question) => {
            return data;
        }, (err: HttpErrorResponse) => {
            console.error(err.message);
        });
    }

    getAnswersByQuestionId(id: number): Observable<PageableAnswer> {
        return this.http.get<PageableAnswer>(routes.questionsPath + '/' + id + '/answers')
            .map((data: PageableAnswer) => {
                return data;
            }, (err: HttpErrorResponse) => {
                console.error((err.message));
            });
    }

    addAnswer(questionId: number, answerContent: string): Observable<void> {
        return this.http.post(routes.questionsPath + '/' + questionId + '/answers', {content: answerContent},
            {responseType: 'text'}).map(
            () => {
            }, (error: HttpErrorResponse) => {
                console.error(error.message);
            }
        );
    }
}
