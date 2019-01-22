import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Device} from '@ionic-native/device';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {TextToSpeech} from '@ionic-native/text-to-speech';
import {RegistrationPage} from '../pages/registration/registration';
import {StallQRScanPage} from '../pages/stall-qr-scan/stall-qr-scan.component';
import {DevConConfig} from '../config/DevConConfig';
import {UserServiceMock} from '../services/user/user-service-mock';
import {ProfilePage} from '../pages/profile/profile';
import {QRScanner} from '@ionic-native/qr-scanner';
import {AppPreferences} from '@ionic-native/app-preferences';
import {AppPreferencesMock} from '../services/app-preferences/app-preferences-mock';
import {TabsPage} from '../pages/tabs/tabs';
import {TextToSpeechService} from '../services/text-to-speech';
import {Floor1Component} from '../components/floor-plans/floor-1/floor-1.component';
import { Floor2Component } from '../components/floor-plans/floor-2/floor-2.component';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        RegistrationPage,
        StallQRScanPage,
        ProfilePage,
        TabsPage,
        Floor1Component,
        Floor2Component
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        RegistrationPage,
        StallQRScanPage,
        ProfilePage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Device,
         QRScanner,
        TextToSpeech,
        TextToSpeechService,
        {
            provide: AppPreferences,
            useClass: AppPreferencesMock
        },
        {
            provide: 'USER_SERVICE',
            useClass: UserServiceMock
        },
        {
            provide: 'APP_CONFIG',
            useValue: DevConConfig
        }, {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        }
    ]
})
export class AppModule {
}
