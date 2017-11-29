import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {Logger} from '../core/logger.service';
import {I18nService} from '../core/i18n.service';
import {AuthenticationService} from '../core/authentication/authentication.service';
import {AuthService, FacebookLoginProvider, SocialUser} from 'angular4-social-login';

const log = new Logger('Login');

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    private user: SocialUser;

    version: string = environment.version;
    error: string = null;
    loginForm: FormGroup;
    isLoading = false;

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private i18nService: I18nService,
                private authService: AuthService,
                private authenticationService: AuthenticationService) {
        this.createForm();
    }

    ngOnInit() {
        this.authService.authState.subscribe((user: SocialUser) => {
            this.user = user;
        });
    }

    login() {
        this.isLoading = true;
        console.log('Why????');
        this.authenticationService.login(this.loginForm.value)
            .pipe(finalize(() => {
                this.loginForm.markAsPristine();
                this.isLoading = false;
            }))
            .subscribe(credentials => {
                log.debug(`${credentials.username} successfully logged in`);
                this.router.navigate(['/'], {replaceUrl: true});
            }, error => {
                log.debug(`Login error: ${error}`);
                this.error = error;
            });
    }

    signInWithGoogle(): void {
        // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(socialUser =>{
            console.log(socialUser.authToken);
        });

    }

    signOut(): void {
        this.authService.signOut();
    }

    setLanguage(language: string) {
        this.i18nService.language = language;
    }

    get currentLanguage(): string {
        return this.i18nService.language;
    }

    get languages(): string[] {
        return this.i18nService.supportedLanguages;
    }

    private createForm() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            remember: true
        });
    }

}
