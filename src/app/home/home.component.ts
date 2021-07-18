import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/@shared/services/data.service';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isShowAlert = false;

  Form!: FormGroup;
  isLoading = false;
  data: any = {
    customerSubscriptionData: {},
    customerDetail: {},
    customerPaymentMethod: {},
  };

  constructor(
    private quoteService: QuoteService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.dataService.dialogSubject.subscribe((res: any) => {
      if (res == 'done') {
        this.showAlert();
        this.getCustomer_Subscription();
      }
    });
    this.getCustomer_Subscription();
  }

  private createForm() {
    this.Form = this.formBuilder.group({
      month_bill: [''],
      payment_info: [''],
      license_utilisation: [''],
      next_payment_date: [''],
      card_number: [''],
    });
  }

  getCustomer_Subscription() {
    this.isLoading = true;
    this.dataService.getCustomer_Subscription('cus_Jq7hwNmp0s0yaP').subscribe(
      (res: any) => {
        this.data.customerSubscriptionData = res[0];
        this.data.customerDetail = res[1];
        this.data.customerPaymentMethod = res[2];
        this.populateFormValues();
        this.isLoading = false;
        console.log(this.data);
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }

  populateFormValues() {
    this.Form.patchValue({
      month_bill: this.data.customerSubscriptionData.data.length
        ? this.data.customerSubscriptionData.data[0].plan.amount / 100
        : '',
      payment_info: this.data.customerPaymentMethod.data.length ? this.data.customerPaymentMethod.data[0].type : '',
      license_utilisation: [''],
      next_payment_date: this.data.customerSubscriptionData.data.length
        ? moment.unix(this.data.customerSubscriptionData.data[0].current_period_end).format('MM/DD/YYYY')
        : '',
      card_number: this.data.customerPaymentMethod.data.length
        ? `********${this.data.customerPaymentMethod.data[0].card.last4}`
        : '',
    });
  }
  showAlert() {
    this.isShowAlert = true;
  }

  routeToCancel() {
    this.router.navigate(['/cancel-account']);
    sessionStorage.setItem('subscriptions', JSON.stringify(this.data.customerSubscriptionData.data));
  }
  submit() {}
}
