import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { HomeComponent } from './home.component';
import { Shell } from '@app/shell/shell.service';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { CancelAccountComponent } from './components/cancel-account/cancel-account.component';
import { TooExpensiveComponent } from './components/too-expensive/too-expensive.component';
import { CancellationComponent } from './components/cancellation/cancellation.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: marker('Home') } },
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
