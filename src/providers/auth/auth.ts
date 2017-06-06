import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';


/*
 Generated class for the AuthProvider provider.
 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AuthProvider {

    constructor(public afAuth: AngularFireAuth) {
        console.log('Hello AuthProvider Provider');
    }

    //TODO: include facebook and google login

    loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
        try {
            return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
        } catch (e) {
            console.log("ERROR AT 24882:");
            console.log(e.message);
        }

    }

    resetPassword(email: string): firebase.Promise<any> {
        try {
            return this.afAuth.auth.sendPasswordResetEmail(email);
        } catch (e) {
            console.log("ERROR AT 24352");
            console.log(e.message);
        }

    }

    logoutUser(): firebase.Promise<any> {
        try {
            return this.afAuth.auth.signOut();
        } catch (e) {
            console.log("ERROR AT 24532");
            console.log(e.message);
        }

    }

    signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
        try {
            return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
        } catch (e) {
            console.log("ERROR AT 24092");
            console.log(e.message);
        }

    }

    signOut(){
        firebase.auth().signOut().then( () => {
            console.log("Signed Out!");
            return true
        }, (error) => {
            console.log("ERROR AT 24935: Sign out error: ", error);
        })
    }


}