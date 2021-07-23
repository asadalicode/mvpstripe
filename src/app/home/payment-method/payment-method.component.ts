import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPaymentMethodComponent } from '@app/@shared/modals/components/add-payment-method/add-payment-method.component';
import { DeleteComponent } from '@app/@shared/modals/components/delete/delete.component';
import { PopupModal } from '@app/@shared/Models/popup-modal';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StripeCardComponent, StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { DataService } from '@app/@shared/services/data.service';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  isLoading: boolean = false;
  customerId: string = '';
  toolTip: string = 'Uh oh, you must add a new payment method before you re move this one.';
  DeleteComponent = DeleteComponent;
  AddPaymentMethodComponent = AddPaymentMethodComponent;
  popupRef = new PopupModal(this.matDialog);
  Form!: FormGroup;

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
  customerData: any = {};
  selectedMethod: any;
  paymentMethodData: any;

  constructor(
    private matDialog: MatDialog,
    private stripeService: StripeService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((res: any) => {
      this.customerId = res.customerId;
      this.getPaymentMethods();
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  getPaymentMethods() {
    this.isLoading = true;
    this.dataService.getPaymentMethods(this.customerId).subscribe(
      (res: any) => {
        this.customerData = res;
        this.selectedMethod = '';
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  private createForm() {
    this.Form = this.formBuilder.group({
      address_line1: ['', Validators.required],
      address_line2: ['', Validators.required],
      address_city: ['', Validators.required],
      address_country: ['', Validators.required],
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.Form.controls[controlName].hasError(errorName);
  };

  selectMethod(data: any, type?: any) {
    if (type == 'delete' && this.customerData.data.length < 2) {
      return 0;
    }
    this.selectedMethod = data;
    this.Form.patchValue({
      address_line1: data.billing_details.address.line1,
      address_line2: data.billing_details.address.line2,
      address_city: data.billing_details.address.city,
      address_country: data.billing_details.address.country,
    });
    if (type == 'delete' && this.customerData.data.length > 1) {
      this.openItemModal('delete', DeleteComponent, {}, 'PaymentMethodDelete');
    }
  }

  submit() {}

  openItemModal(type: string, component: any, data?: {}, fromComponent?: string) {
    this.matDialog.closeAll();
    const dialogRef = this.popupRef.openModal(
      type,
      component,
      { data: this.selectedMethod ? this.selectedMethod : data },
      fromComponent
    );
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result && result.event == 'updated') {
        console.log(result.event);
        this.updatePaymentMethod();
      }
      if (result && result.event == 'deleted') {
        this.deletePaymentMethod(true);
      }

      if (result && result.event == 'paymentAdded') {
        this.getPaymentMethods();
      }
    });
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
            this.notifierService.notify('success', 'Payment method updated successfully');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  attachPaymentMethod() {
    let body = {
      customerId: this.customerId,
      paymentId: this.paymentMethodData.id,
    };

    this.dataService.attachPaymentMethod(body).subscribe(
      (res: any) => {
        this.deletePaymentMethod();
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  deletePaymentMethod(showAlert?: boolean) {
    this.isLoading = true;
    let body = {
      paymentId: this.selectedMethod.id,
    };
    this.dataService.deletePaymentMethod(body).subscribe(
      (res: any) => {
        this.getPaymentMethods();
        if (showAlert) {
          this.notifierService.notify('success', 'Payment method deleted successfully');
        }
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }
}
