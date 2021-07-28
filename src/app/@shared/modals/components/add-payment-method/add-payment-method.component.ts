import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  StripeCardComponent,
  StripeCardNumberComponent,
  StripeService,
} from 'ngx-stripe';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { DataService } from '@app/@shared/services/data.service';
import { NotifierService } from 'angular-notifier';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.scss'],
})
export class AddPaymentMethodComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  delete: boolean = true;
  dataModel: any = {};
  data: any = {};
  Form!: FormGroup;
  isLoading: boolean = false;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };
  paymentMethodData: any = {};
  CountryCodes$: Observable<any>;

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPaymentMethodComponent>,
    private stripeService: StripeService,
    private dataService: DataService,
    private notifierService: NotifierService,
    @Inject(MAT_DIALOG_DATA) public dataObject: any
  ) {}

  ngOnInit(): void {
    this.dataModel = this.dataObject;
    console.log(this.dataModel);
    this.getCountryCodes();
    this.createForm();
    if (this.dataModel.type == 'edit-payment-method') {
      this.fillFormValues();
    }
  }

  private createForm() {
    this.Form = this.formBuilder.group({
      id: [this.dataModel.data.data.id],
      address_line1: ['', Validators.required],
      address_line2: ['', Validators.required],
      address_city: ['', Validators.required],
      address_country: ['', Validators.required],
    });
  }

  fillFormValues() {
    let data = this.dataModel.data.data;
    this.Form.patchValue({
      address_line1: data.billing_details.address.line1,
      address_line2: data.billing_details.address.line2,
      address_city: data.billing_details.address.city,
      address_country: data.billing_details.address.country,
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.Form.controls[controlName].hasError(errorName);
  };

  addPaymentMethod() {
    this.isLoading = true;
    this.stripeService
      .createPaymentMethod({
        type: 'card',
        card: this.card.element,
        billing_details: {
          address: {
            line1: this.Form.value.address_line1,
            line2: this.Form.value.address_line2,
            city: this.Form.value.address_city,
            country: this.Form.value.address_country,
          },
        },
      })
      .subscribe(
        (res: any) => {
          if (res.error) {
            this.notifierService.notify('error', `${res.error.message}`);
            this.isLoading = false;
          } else {
            this.paymentMethodData = res.paymentMethod;
            this.attachPaymentMethod();
            this.notifierService.notify(
              'success',
              'Payment method created successfully'
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getCountryCodes() {
    this.dataService.getCountryCodes().subscribe((res: any) => {
      console.log(res);
      this.CountryCodes$ = of(res);
    });
  }

  attachPaymentMethod() {
    let body = {
      customerId: this.dataModel.data.data.customer,
      paymentId: this.paymentMethodData.id,
    };

    this.dataService.attachPaymentMethod(body).subscribe(
      (res: any) => {
        this.dataModel.type == 'edit-payment-method'
          ? this.closeModal('paymentUpdated')
          : this.closeModal('paymentAdded');
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  updatePaymentMethod() {
    this.isLoading = true;
    this.stripeService
      .createPaymentMethod({
        type: 'card',
        card: this.card.element,
        billing_details: {
          address: {
            line1: this.Form.value.address_line1,
            line2: this.Form.value.address_line2,
            city: this.Form.value.address_city,
            country: this.Form.value.address_country,
          },
        },
      })
      .subscribe(
        (res: any) => {
          if (res.error) {
            this.isLoading = false;
            this.notifierService.notify('error', `${res.error.message}`);
          } else {
            this.paymentMethodData = res.paymentMethod;
            this.attachPaymentMethod();
            this.notifierService.notify(
              'success',
              'Payment method updated successfully'
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  closeModal(e: any) {
    this.dialogRef.close({ event: e });
  }

  close() {
    this.dialogRef.close({ event: 'close' });
  }
}
