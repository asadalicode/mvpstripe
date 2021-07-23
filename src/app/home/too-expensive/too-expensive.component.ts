import { Component, OnInit } from '@angular/core';
import { PopupModal } from '@app/@shared/Models/popup-modal';
import { MatDialog } from '@angular/material/dialog';
import { DiscountOfferComponent } from '@app/@shared/modals/components/discount-offer/discount-offer.component';
import { DeleteComponent } from '@app/@shared/modals/components/delete/delete.component';

@Component({
  selector: 'app-too-expensive',
  templateUrl: './too-expensive.component.html',
  styleUrls: ['./too-expensive.component.scss'],
})
export class TooExpensiveComponent implements OnInit {
  popupRef = new PopupModal(this.matDialog);
  DiscountOfferComponent = DiscountOfferComponent;
  DeleteComponent = DeleteComponent;
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

  licenceBilling() {
    window.open(
      'https://knowledge.performwithmvp.com/licenses-and-billing',
      '_blank'
    );
  }
}
