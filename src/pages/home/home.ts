import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';

import {Stripe} from '@ionic-native/stripe';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    private token: string = '';
    private ngForm: any = {
        number: '',
        cvc: '',
        month: '',
        year: '',
        amount: 2000
    };

    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                private stripe: Stripe) {
        console.log(Stripe);
    }


    /*let card = {
        number: '4242424242424242',
        expMonth: 12,
        expYear: 2020,
        cvc: '220'
    };*/

    onSubmit() {
        this.stripe.setPublishableKey('pk_test_ZfwpGKN3MAsEyMiWUvkDDrro');

        console.log(JSON.stringify(this.ngForm));

        this.stripe.createCardToken(this.ngForm)
            .then(token => console.log(token))
            .catch(error => console.log(error));
    }


}
