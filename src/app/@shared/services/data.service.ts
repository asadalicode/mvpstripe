import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dialogSubject = new BehaviorSubject('');

  constructor(private http: HttpClient) {
    this.dialogSubject.next('');
  }

  getCustomer_Subscription(id: any): Observable<any> {
    let customerSubscription = this.http.get(`/getCustomerSubscription?id=${id}`);
    let customer = this.http.get(`/getCustomer?id=${id}`);
    let customerPaymentMethod = this.http.get(`/getPaymentMethods?id=${id}`);
    return forkJoin([customerSubscription, customer, customerPaymentMethod]);
  }

  getInvoices(id: any): Observable<any> {
    return this.http.get(`/listInvoices?id=${id}`);
  }
}
