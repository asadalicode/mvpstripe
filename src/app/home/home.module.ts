import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Angulartics2Module } from 'angulartics2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { environment } from '@env/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoicesComponent } from './invoices/invoices.component';
import { CancelAccountComponent } from './cancel-account/cancel-account.component';
import { TooExpensiveComponent } from './too-expensive/too-expensive.component';
import { CancellationComponent } from './cancellation/cancellation.component';
import { NgxStripeModule } from 'ngx-stripe';
import { RequestPaymentComponent } from './request-payment/request-payment.component';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    NgbModule,
    MaterialModule,
    Angulartics2Module,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(environment.stripeKey),
  ],
  declarations: [
    HomeComponent,
    PaymentMethodComponent,
    InvoicesComponent,
    CancelAccountComponent,
    TooExpensiveComponent,
    CancellationComponent,
    RequestPaymentComponent,
  ],
})
export class HomeModule {}
