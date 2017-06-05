import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';

declare var Stripe;
var stripe = Stripe("pk_test_ZfwpGKN3MAsEyMiWUvkDDrro");

@Component({
    selector: 'page-credit-card',
    templateUrl: 'credit-card.html'
})
export class CreditCardPage {

    private token: string = '';
    private ngForm: any = {
        number: '',
        cvc: '',
        exp_month: '',
        exp_year: '',
        amount: 2000
    };

    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        var elements = stripe.elements();

        var style = {
            base: {
                color: '#32325d',
                lineHeight: '24px',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        };
        var card = elements.create('card', {style: style});

        card.mount('#card-element');

        card.addEventListener('change', (event) => {
            var displayError = document.getElementById('card-error');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });

        var form = document.getElementById('payment-form');
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            stripe.createToken(card).then(function (result) {
                if (result.error) {
                    /*console.log(result.error);*/
                    var errorElement = document.getElementById('card-error');
                    errorElement.textContent = result.error.message;
                } else {
                    console.log("Submitting token!");
                    console.log(result.token);
                }
            });
        });
    }
}


/*let card = {
 number: '4242424242424242',
 expMonth: 12,
 expYear: 2020,
 cvc: '220'
 };*/

