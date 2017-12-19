import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import {TranslateModule} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {HomeModule} from './home/home.module';
import {AboutModule} from './about/about.module';

import { SocialLoginModule } from 'angular4-social-login';
import {GoogleLoginProvider, FacebookLoginProvider, AuthServiceConfig} from 'angular4-social-login';
import {QuestionModule} from './question/question.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
        AboutModule,
        SocialLoginModule,
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [{
        provide: AuthServiceConfig,
        useFactory: provideConfig,
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
