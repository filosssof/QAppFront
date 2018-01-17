import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const credentials = JSON.parse(localStorage.getItem('credentials'));
        const token = credentials ? credentials.token : null;
        req = req.clone({
            setHeaders: {
                Authorization: token
            }
        });

        return next.handle(req);
    }

}
