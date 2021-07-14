import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { PopupModal } from '@app/@shared/Models/popup-modal';

import { DeleteComponent } from '@app/@shared/modals/components/delete/delete.component';

@Component({
  selector: 'app-discount-offer',
  templateUrl: './discount-offer.component.html',
  styleUrls: ['./discount-offer.component.scss'],
})
export class DiscountOfferComponent implements OnInit {
  socities: any = [];
  isSocietyLayout = false;
  delete: boolean = true;
  dataModel: any = {};
  data: any = {};
  popupRef = new PopupModal(this.matDialog);
  DeleteComponent = DeleteComponent;

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DiscountOfferComponent>,

    @Inject(MAT_DIALOG_DATA) public dataObject: any
  ) {}
  ngOnInit(): void {
    this.dataModel = this.dataObject.data.data;
    this.data = this.dataObject;
  }
  closeModal() {
    this.dialogRef.close({ event: 'done' });
  }
  close() {
    this.dialogRef.close({ event: 'close' });
  }
  lookUpComponent() {
    let component = this.dataObject.fromComponent;
    console.log(component);

    switch (component) {
      case 'TooExpensive':
        // this.deleteCategory();
        break;
      case 'Cancellation':
        // this.deleteCategory();
        break;

      // case 'ProfessionManagement':
      //   this.deleteProfession();
      //   break;
      // case 'AdminList':
      //   this.deleteAdmin();
      //   break;

      default: {
        break;
      }
    }
  }
  // deleteCategory() {
  //   this.closeModal();
  // }
  // deleteProfession() {
  //   this.closeModal();
  // }
  // deleteAdmin() {
  //   this.closeModal();
  // }
  openItemModal(type: string, component: any, data?: {}, fromComponent?: string) {
    this.matDialog.closeAll();
    const dialogRef = this.popupRef.openModal(type, component, { data: data }, fromComponent);
  }
}
