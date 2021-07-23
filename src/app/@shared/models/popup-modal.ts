import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
export class PopupModal {
  modalDialog: any;

  constructor(public matDialog: MatDialog) {}

  openModal(type: string, componentRef: any, modalData?: object, fromComponent?: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    switch (type) {
      case 'delete':
      case 'delete-user': {
        dialogConfig.width = '480px';
        dialogConfig.id = `modal-${type}`;
        (dialogConfig.backdropClass = 'backdropBackground'),
          (dialogConfig.data = {
            type: type,
            data: modalData,
            fromComponent: fromComponent,
          });

        dialogConfig.panelClass = 'custom-modalbox';
        this.modalDialog = this.matDialog.open(componentRef, dialogConfig);
        break;
      }

      case 'add-payment-method': {
        dialogConfig.width = '1000px';
        dialogConfig.id = `modal-${type}`;
        dialogConfig.data = {
          type: type,
          data: modalData,
          fromComponent: fromComponent,
        };
        dialogConfig.backdropClass = 'backdropBackground';
        dialogConfig.panelClass = 'custom-modalbox';
        this.modalDialog = this.matDialog.open(componentRef, dialogConfig);
        break;
      }
      case 'discount-offer': {
        dialogConfig.width = '500px';
        dialogConfig.id = `modal-${type}`;
        dialogConfig.data = modalData;
        dialogConfig.backdropClass = 'backdropBackground';
        dialogConfig.panelClass = 'custom-modalbox';
        this.modalDialog = this.matDialog.open(componentRef, dialogConfig);
        break;
      }

      default: {
        break;
      }
    }

    return this.modalDialog;
  }

  closeModal() {
    this.modalDialog.close();
  }
}
