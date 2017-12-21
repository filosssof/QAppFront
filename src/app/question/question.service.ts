import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {PageableQuestion, Question} from "../shared/models/models.interfaces";

const routes = {
    questionsPath: `http://localhost:8080/questions`
};

export interface QuestionFilter {
    titleContains: string;
}

@Injectable()
export class QuestionService {

    constructor(private http: HttpClient) {
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

}

