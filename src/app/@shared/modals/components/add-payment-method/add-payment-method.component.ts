import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.scss'],
})
export class AddPaymentMethodComponent implements OnInit {
  socities: any = [];
  isSocietyLayout = false;
  delete: boolean = true;
  dataModel: any = {};
  data: any = {};
  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPaymentMethodComponent>,
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
      case 'PaymentMethod':
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
}
