import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {AngularFireAuth} from 'angularfire2/auth';
import {AuthProvider} from '../providers/auth/auth';


import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;

    constructor(platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                afAuth: AngularFireAuth,
                authData: AuthProvider) {
        platform.ready().then(() => {



            const authObserver = authData.afAuth.authState.subscribe(user => {
                console.log("User is: ");
                console.log(user);
                if (user) {
                    this.rootPage = HomePage;
                    authObserver.unsubscribe();
                } else {
                    this.rootPage = LoginPage;
                    authObserver.unsubscribe();
                }
            });


            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}

