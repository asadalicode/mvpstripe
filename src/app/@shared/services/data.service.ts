import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { PaymentIntent } from '@stripe/stripe-js';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CountryCodes } from '../models/country_codes';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dialogSubject = new BehaviorSubject('');

  constructor(private http: HttpClient) {
    this.dialogSubject.next('');
  }

  getCustomer_Subscription(id: any): Observable<any> {
    let customerSubscription = this.http.get(
      `/getCustomerSubscription?id=${id}`
    );
    let customer = this.http.get(`/getCustomer?id=${id}`);
    let customerPaymentMethod = this.http.get(`/getPaymentMethods?id=${id}`);
    return forkJoin([customerSubscription, customer, customerPaymentMethod]);
  }

  getInvoices(id: any): Observable<any> {
    return this.http.get(`/listInvoices?id=${id}`);
  }

  getPaymentMethods(id: any): Observable<any> {
    return this.http.get(`/getPaymentMethods?id=${id}`);
  }

  attachPaymentMethod(body: any): Observable<any> {
    return this.http.post(`/attachPaymentMethod`, body);
  }
  deletePaymentMethod(body: any): Observable<any> {
    console.log(body);
    return this.http.post(`/detachPaymentMethod`, body);
  }

  cancelSubscription(id: any): Observable<any> {
    return this.http.delete(`/cancelSubscription?id=${id}`);
  }

  createPaymentIntent(body: any): Observable<any> {
    return this.http.post<PaymentIntent>('/createPaymentIntent', body);
  }

  checkoutSession(body: any): Observable<any> {
    console.log(body);
    return this.http.post<PaymentIntent>('/create-checkout-session', body);
  }

  getCustomerCharges(id: any): Observable<any> {
    return this.http.get(`/getCustomerCharges?id=${id}`);
  }

  getCountryCodes(): Observable<CountryCodes> {
    return this.http.get(`/countrySpecs`).pipe(
      // Adapt each item in the raw data array
      map((data: any) => CountryCodes.adapt(data.data[0]))
    );
  }
}
