import {Title} from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ObservableMedia} from '@angular/flex-layout';

import {AuthenticationService} from '../authentication/authentication.service';
import {I18nService} from '../i18n.service';
import {AuthService, FacebookLoginProvider, SocialUser} from 'angular4-social-login';

@Component({
    selector: 'app-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

    isLoading = false;
    error: string = null;
    private user: SocialUser;

    constructor(private router: Router,
                private titleService: Title,
                private media: ObservableMedia,
                private authenticationService: AuthenticationService,
                private authService: AuthService,
                private i18nService: I18nService) {
    }

    ngOnInit() {
    }

    setLanguage(language: string) {
        this.i18nService.language = language;
    }

    logout() {
        this.authenticationService.logout()
            .subscribe();
    }

    isAuthenticated(): boolean {
        return this.authenticationService.isAuthenticated();
    }

    signInWithGoogle(): void {
        // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signInWithFB(): void {
        this.isLoading = true;
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(socialUser => {
            this.authenticationService.loginFacebook(socialUser.authToken)
                .subscribe(credentials => {
                }, error => {
                    this.error = error;
                });
        });

    }

    signOut(): void {
        this.authService.signOut();
    }

    get username(): string {
        const credentials = this.authenticationService.credentials;
        return credentials ? credentials.username : null;
    }

    get languages(): string[] {
        return this.i18nService.supportedLanguages;
    }

    get isMobile(): boolean {
        return this.media.isActive('xs') || this.media.isActive('sm');
    }

    get title(): string {
        return this.titleService.getTitle();
    }
}
