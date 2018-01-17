import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {TranslateModule} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {HomeModule} from './home/home.module';
import {AboutModule} from './about/about.module';

import {SocialLoginModule} from 'angular4-social-login';
import {GoogleLoginProvider, FacebookLoginProvider, AuthServiceConfig} from 'angular4-social-login';
import {QuestionModule} from './question/question.module';
import {AnswerModule} from './answer/answer.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatInputModule} from '@angular/material';
import {JWTInterceptor} from './core/authentication/jwt-interceptor';
import {AnswerDialogComponent} from "./answer/answer-dialog.component";

const config = new AuthServiceConfig([
    // {
    //     id: GoogleLoginProvider.PROVIDER_ID,
    //     provider: new GoogleLoginProvider('453019100708-1aqms6ktq76445rbsnv8i7fcouetjqr0.apps.googleusercontent.com')
    // },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('370860263035094')
    }
]);

export function provideConfig() {
    return config;
}


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        MatInputModule,
        HttpModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        NgbModule.forRoot(),
        BrowserAnimationsModule,
        MaterialModule,
        CoreModule,
        SharedModule,
        HomeModule,
        QuestionModule,
        AnswerModule,
        AboutModule,
        SocialLoginModule,
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [{
        provide: AuthServiceConfig,
        useFactory: provideConfig
    }, {
        provide: HTTP_INTERCEPTORS,
        useClass: JWTInterceptor,
        multi: true
    }],
    entryComponents: [AnswerDialogComponent],
bootstrap: [AppComponent]
})

export class AppModule {
}
