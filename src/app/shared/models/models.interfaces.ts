
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

export interface QuestionFilter {
    titleContains: string;
}

export interface Answer {
    id: number;
    content: string;
    createdBy: Author;
    createdDate: Date;
    rank: number;
}

export interface PageableQuestion extends Pageable {
    content: Question[];
}

export interface PageableAnswer extends Pageable {
    content: Answer[];
}

export interface Pageable {
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

export interface Credentials {
    // Customize received credentials here
    username: string;
    token: string;
}

export interface LoginContext {
    username: string;
    password: string;
    remember?: boolean;
}
