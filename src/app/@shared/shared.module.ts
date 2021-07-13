import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { AddPaymentMethodComponent } from './modals/components/add-payment-method/add-payment-method.component';
import { DeleteComponent } from './modals/components/delete/delete.component';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule],
  declarations: [LoaderComponent, AddPaymentMethodComponent, DeleteComponent],
  exports: [LoaderComponent],
})
export class SharedModule {}
