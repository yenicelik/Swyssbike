import {Component, NgZone} from '@angular/core'; //Import NgZone because we have a bug
import {
  IonicPage, NavController, NavParams,
  LoadingController, Loading, AlertController
} from 'ionic-angular';
// Based on https://javebratt.com/angularfire2-authentication-ionic/ -->

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthProvider} from '../../providers/auth/auth';

import {EmailValidator} from '../../validators/email';

import {Facebook} from '@ionic-native/facebook';
import {GooglePlus} from '@ionic-native/google-plus';
import firebase from 'firebase';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  loading: Loading;

  //decide whether to keep this or not
  userProfile: any = null;
  zone: NgZone;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authData: AuthProvider,
              public formBuilder: FormBuilder,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private facebook: Facebook,
              private googlePlus: GooglePlus) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    this.zone = new NgZone({});
    firebase.auth().onAuthStateChanged( (user) => {
      this.zone.run( () => {
        if (user) {
          this.userProfile = user;
        } else {
          this.userProfile = null;
        }
      })
    });

  }


  goToResetPassword() {
    this.navCtrl.push('ResetPasswordPage');
  }

  createAccount() {
    this.navCtrl.push('SignupPage');
  }

  loginGooglePlus() {
    this.googlePlus.login({
      'webClientId': '777348050122-794mipbttmorfli21pb63muss9vlklql.apps.googleusercontent.com',
      'offline': true
    }).then( (res) => {
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then( (success) => {
            console.log("Firebase success: " + JSON.stringify(success));
          })
          .catch( (error) => {
            console.log("ERROR AT 13539: Firebase failure: " + JSON.stringify(error))
          })
      }).catch((err) => console.error(" ERROR AT 13241: loginGooglePlus (no firebase) Error: ", JSON.stringify(err)));

  }


  loginFacebook() {
    this.facebook.login(['email']).then( (response) => {

      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

      firebase.auth().signInWithCredential(facebookCredential)
        .then( (success) => {
          console.log("Firebase succes: " + JSON.stringify(success));
          this.userProfile = success;
        })
        .catch( (error) => {
          console.log("ERROR AT 13902: Firebase failure: " + JSON.stringify(error));
        });

    }).catch( (error) => {
      console.log("ERROR AT 13239: Facebook login error (Not firebase yet)");
      console.log(JSON.stringify(error));
    });

  }

  loginUser() {
    if (!this.loginForm.valid) {

      console.log(this.loginForm.value);
    } else {

      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then((authData) => {
          this.navCtrl.setRoot('HomePage');
        }, error => {
            let alert = this.alertCtrl.create({
              message: "ERROR AT 13319:" + error.message,
              buttons: [{
                text: "Ok",
                role: "cancel"
              }]
            });
            alert.present();
          });

    }
  }

  signOutOfThis() {
    return this.authData.signOut()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
