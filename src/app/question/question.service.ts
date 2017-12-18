import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

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

export interface Question {
    id: number;
    title: string;
    content: string;
    answered: boolean;
    answers: object;
    createdBy: Author;
    createdDate: Date;
    rank: number;
}

export interface PageableQuestion {
    content: Question[];
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
    sort: Sort;


}

export interface Sort {
    ascending: boolean;
    descending: boolean;
    direction: string;
    ignoreCase: boolean;
    nullHandling: string;
    property: string;
}

export interface Author {
    facebookId: string;
    googleId: string;
    id: number;
    karma: number;
    name: string;
    registeredDate: Date;
    roles: string;
}
