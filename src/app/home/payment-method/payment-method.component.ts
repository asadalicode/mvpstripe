import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPaymentMethodComponent } from '@app/@shared/modals/components/add-payment-method/add-payment-method.component';
import { DeleteComponent } from '@app/@shared/modals/components/delete/delete.component';
import { PopupModal } from '@app/@shared/Models/popup-modal';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent implements OnInit {
  DeleteComponent = DeleteComponent;
  AddPaymentMethodComponent = AddPaymentMethodComponent;
  popupRef = new PopupModal(this.matDialog);

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}
  openItemModal(type: string, component: any, data?: {}, fromComponent?: string) {
    this.matDialog.closeAll();
    const dialogRef = this.popupRef.openModal(type, component, { data: data }, fromComponent);
  }
}
