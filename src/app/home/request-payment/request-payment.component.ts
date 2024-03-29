import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { StripeService } from 'ngx-stripe';
import {
  StripeElementsOptions,
  PaymentRequestPaymentMethodEvent,
  PaymentIntent,
  PaymentRequestShippingAddressEvent,
} from '@stripe/stripe-js';
import { DataService } from '@app/@shared/services/data.service';
@Component({
  selector: 'app-request-payment',
  templateUrl: './request-payment.component.html',
  styleUrls: ['./request-payment.component.scss'],
})
export class RequestPaymentComponent implements OnInit {
  ngOnInit() {}

  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };

  paymentRequestOptions = {
    country: 'US',
    currency: 'usd',
    total: {
      label: 'Demo Total',
      amount: 1000,
    },

    requestPayerName: true,
    requestPayerEmail: true,
  };

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private stripeService: StripeService
  ) {}

  onPaymentMethod(ev: PaymentRequestPaymentMethodEvent) {
    this.createPaymentIntent()
      .pipe(
        switchMap((pi) => {
          console.log(pi);
          return this.stripeService
            .confirmCardPayment(
              pi.client_secret,
              { payment_method: ev.paymentMethod.id },
              { handleActions: false }
            )
            .pipe(
              switchMap((confirmResult) => {
                if (confirmResult.error) {
                  // Report to the browser that the payment failed,
                  // prompting it to re-show the payment interface,
                  // or show an error message and close the payment.
                  ev.complete('fail');
                  return of({
                    error: new Error('Error Confirming the payment'),
                  });
                } else {
                  // Report to the browser that the confirmation was
                  // successful, prompting it to close the browser
                  // payment method collection interface.
                  ev.complete('success');
                  // Let Stripe.js handle the rest of the payment flow.
                  return this.stripeService.confirmCardPayment(
                    pi.client_secret
                  );
                }
              })
            );
        })
      )
      .subscribe((result) => {
        if (result.error) {
          // The payment failed -- ask your customer for a new payment method.
        } else {
          console.log(result);
          // The payment has succeeded.
        }
      });
  }

  onShippingAddressChange(ev: PaymentRequestShippingAddressEvent) {
    if (ev.shippingAddress.country !== 'US') {
      ev.updateWith({ status: 'invalid_shipping_address' });
    } else {
      // Replace this with your own custom implementation if needed
      fetch('/calculateShipping', {
        data: JSON.stringify({
          shippingAddress: ev.shippingAddress,
        }),
      } as any)
        .then((response) => response.json())
        .then((result) =>
          ev.updateWith({
            status: 'success',
            shippingOptions: result.supportedShippingOptions,
          })
        );
    }
  }

  onNotAvailable() {
    // Subscribe to this event in case you want to act
    // base on availability
    console.log('Payment Request is not Available');
  }

  createPaymentIntent(): Observable<PaymentIntent> {
    // Replace this with your own custom implementation
    // to perform a Payment Intent Creation
    // You will need your own Server to do that
    let data = {
      amount: this.paymentRequestOptions.total.amount,
      // customerID: 'cus_JtoExnGNvNWBvG', //lee
      customerID: 'cus_Jq7hwNmp0s0yaP', //asad

      email: 'asadali.code123@gmail.com',
    };
    return this.dataService.createPaymentIntent(data);
  }
}
