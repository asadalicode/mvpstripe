import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PopupModal } from '@app/@shared/Models/popup-modal';
import { DiscountOfferComponent } from '@app/@shared/modals/components/discount-offer/discount-offer.component';

@Component({
  selector: 'app-cancellation',
  templateUrl: './cancellation.component.html',
  styleUrls: ['./cancellation.component.scss'],
})
export class CancellationComponent implements OnInit {
  DiscountOfferComponent = DiscountOfferComponent;
  popupRef = new PopupModal(this.matDialog);

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}

  openItemModal(
    type: string,
    component: any,
    data?: {},
    fromComponent?: string
  ) {
    this.matDialog.closeAll();
    const dialogRef = this.popupRef.openModal(
      type,
      component,
      { data: data },
      fromComponent
    );
  }

  bookCall() {
    window.open('https://meetings.hubspot.com/matthew460', '_blank');
  }
}
