import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

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

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

    private _credentials: Credentials;
    private baseURL = 'http://localhost:8080';

    constructor(private $httpClient: HttpClient) {
        this._credentials = JSON.parse(sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey));
    }

    /**
     * Authenticates the user.
     * @param {LoginContext} context The login parameters.
     * @return {Observable<Credentials>} The user credentials.
     */
    login(context: LoginContext): Observable<Credentials> {
        return this.$httpClient.post<Credentials>(this.baseURL + '/user/login', JSON.stringify(context))
            .map((data: Credentials) => {
                console.log(data);
                this.setCredentials(data, context.remember);
                return data;
            }, (err: HttpErrorResponse) => {
                console.error(err.message);
            });

    }

    loginFacebook(authToken: string): Observable<Credentials> {
        return this.$httpClient.post<Credentials>(this.baseURL + '/oauth/facebook/login', authToken)
            .map((data: Credentials) => {
                console.log(data);
                this.setCredentials(data, true);
                return data;
            }, (err: HttpErrorResponse) => {
                console.error(err.message);
            });
    }

    /**
     * Logs out the user and clear credentials.
     * @return {Observable<boolean>} True if the user was logged out successfully.
     */
    logout(): Observable<boolean> {
        // Customize credentials invalidation here
        this.setCredentials();
        return Observable.of(true);
    }

    /**
     * Checks is the user is authenticated.
     * @return {boolean} True if the user is authenticated.
     */
    isAuthenticated(): boolean {
        return !!this.credentials;
    }

    /**
     * Gets the user credentials.
     * @return {Credentials} The user credentials or null if the user is not authenticated.
     */
    get credentials(): Credentials {
        return this._credentials;
    }

    /**
     * Sets the user credentials.
     * The credentials may be persisted across sessions by setting the `remember` parameter to true.
     * Otherwise, the credentials are only persisted for the current session.
     * @param {Credentials=} credentials The user credentials.
     * @param {boolean=} remember True to remember credentials across sessions.
     */
    private setCredentials(credentials?: Credentials, remember?: boolean) {
        this._credentials = credentials || null;

        if (credentials) {
            const storage = remember ? localStorage : sessionStorage;
            storage.setItem(credentialsKey, JSON.stringify(credentials));
        } else {
            sessionStorage.removeItem(credentialsKey);
            localStorage.removeItem(credentialsKey);
        }
    }

}
