import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { HomeComponent } from './home.component';
import { Shell } from '@app/shell/shell.service';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { CancelAccountComponent } from './cancel-account/cancel-account.component';
import { TooExpensiveComponent } from './too-expensive/too-expensive.component';
import { CancellationComponent } from './cancellation/cancellation.component';
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: marker('Home') } },
    {
      path: 'success',
      component: SuccessComponent,
      data: { title: marker('Success') },
    },

    {
      path: 'cancel',
      component: CancelComponent,
      data: { title: marker('Cancel') },
    },
    { path: 'payment-method/:customerId', component: PaymentMethodComponent },
    { path: 'invoices/:customerId', component: InvoicesComponent },
    { path: 'cancel-account', component: CancelAccountComponent },
    { path: 'too-expensive', component: TooExpensiveComponent },
    { path: 'cancellation', component: CancellationComponent },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
