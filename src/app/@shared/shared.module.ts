import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { AddPaymentMethodComponent } from './modals/components/add-payment-method/add-payment-method.component';
import { DeleteComponent } from './modals/components/delete/delete.component';

import { DiscountOfferComponent } from './modals/components/discount-offer/discount-offer.component';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule, NgbModule],
  declarations: [LoaderComponent, AddPaymentMethodComponent, DeleteComponent, DiscountOfferComponent],
  exports: [LoaderComponent],
})
export class SharedModule {}
