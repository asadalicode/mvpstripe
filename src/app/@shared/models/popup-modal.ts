import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
export class PopupModal {
  modalDialog: any;

  constructor(public matDialog: MatDialog) {}

  openModal(type: string, componentRef: any, modalData?: object, fromComponent?: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    switch (type) {
      case 'login': {
        dialogConfig.width = '450px';
        dialogConfig.id = `modal-${type}`;
        dialogConfig.data = modalData;
        this.modalDialog = this.matDialog.open(componentRef, dialogConfig);
        break;
      }
      case 'signup': {
        dialogConfig.width = '450px';
        dialogConfig.id = `modal-${type}`;
        dialogConfig.data = modalData;
        this.modalDialog = this.matDialog.open(componentRef, dialogConfig);
        break;
      }
      case 'item-lock':
      case 'item-unlock':
      case 'delete':
      case 'delete-user':
      case 'revoke': {
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
      // case 'delete': {
      //   dialogConfig.width = '480px';
      //   dialogConfig.id = `modal-${type}`;
      //   dialogConfig.data = modalData;
      //   dialogConfig.panelClass = 'custom-modalbox';
      //   this.modalDialog = this.matDialog.open(componentRef, dialogConfig);
      //   break;
      // }
      // case 'edit-role': {
      //   dialogConfig.width = '550px';
      //   dialogConfig.id = `modal-${type}`;
      //   dialogConfig.data = modalData;
      //   dialogConfig.panelClass = 'custom-modalbox';
      //   this.modalDialog = this.matDialog.open(componentRef, dialogConfig);
      //   break;
      // }
      case 'edit-name':
      case 'edit-role':
      case 'add-new': {
        dialogConfig.width = '550px';
        dialogConfig.id = `modal-${type}`;
        dialogConfig.backdropClass = 'backdropBackground';
        dialogConfig.data = {
          type: type,
          data: modalData,
          fromComponent: fromComponent,
        };
        dialogConfig.panelClass = 'custom-modalbox';
        this.modalDialog = this.matDialog.open(componentRef, dialogConfig);
        break;
      }
      // case 'add-new': {
      //   dialogConfig.width = '550px';
      //   dialogConfig.id = `modal-${type}`;
      //   dialogConfig.data = modalData;
      //   dialogConfig.panelClass = 'custom-modalbox';
      //   this.modalDialog = this.matDialog.open(componentRef, dialogConfig);
      //   break;
      // }
      case 'change-avatar': {
        dialogConfig.width = '550px';
        dialogConfig.id = `modal-${type}`;
        dialogConfig.data = modalData;
        dialogConfig.backdropClass = 'backdropBackground';
        dialogConfig.panelClass = 'custom-modalbox';
        this.modalDialog = this.matDialog.open(componentRef, dialogConfig);
        break;
      }
      case 'profession-admin': {
        dialogConfig.width = '550px';
        dialogConfig.id = `modal-${type}`;
        dialogConfig.data = modalData;
        dialogConfig.backdropClass = 'backdropBackground';
        dialogConfig.panelClass = 'custom-modalbox';
        this.modalDialog = this.matDialog.open(componentRef, dialogConfig);
        break;
      }
      case 'place-of-employement': {
        dialogConfig.width = '550px';
        dialogConfig.id = `modal-${type}`;
        dialogConfig.data = modalData;
        dialogConfig.backdropClass = 'backdropBackground';
        dialogConfig.panelClass = 'custom-modalbox';
        this.modalDialog = this.matDialog.open(componentRef, dialogConfig);
        break;
      }
      case 'change-password': {
        dialogConfig.width = '400px';
        dialogConfig.id = `modal-${type}`;
        dialogConfig.data = modalData;
        dialogConfig.backdropClass = 'backdropBackground';
        dialogConfig.panelClass = 'custom-modalbox';
        this.modalDialog = this.matDialog.open(componentRef, dialogConfig);
        break;
      }

      case 'img-cropper': {
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
