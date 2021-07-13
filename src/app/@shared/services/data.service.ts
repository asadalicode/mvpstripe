import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getCustomerSubscription(id: any): Observable<any> {
    const url = `/getCustomerSubscription?id=${id}`;
    return this.http.get(url);
  }

  getCustomer_Subscription(id: any): Observable<any> {
    let customerSubscription = this.http.get(`/getCustomerSubscription?id=${id}`);
    let customer = this.http.get(`/getCustomer?id=${id}`);
    let customerPaymentMethod = this.http.get(`/getPaymentMethods?id=${id}`);
    return forkJoin([customerSubscription, customer, customerPaymentMethod]);
  }
}