import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { DataService } from '@app/@shared/services/data.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export class subscriptions {
  constructor(public id: []) {}
}
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  isShowAlert = false;
  socities: any = [];
  isSocietyLayout = false;
  delete: boolean = true;
  dataModel: any = {};
  data: any = {};
  constructor(
    private matDialog: MatDialog,
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataObject: any
  ) {}
  ngOnInit(): void {
    // this.dataModel = this.dataObject.data.data;
    // this.data = this.dataObject;
  }
  closeModal() {
    this.dialogRef.close({ event: 'done' });
    this.dataService.dialogSubject.next('done');
    this.router.navigate(['/']);
  }

  closeAfterDelete() {
    this.dialogRef.close({ event: 'deleted' });
  }

  closeAfterUpdate() {
    this.dialogRef.close({ event: 'updated' });
  }
  close() {
    this.dialogRef.close({ event: 'close' });
  }
  lookUpComponent() {
    let component = this.dataObject.fromComponent;
    console.log(component);

    switch (component) {
      case 'PaymentMethodDelete':
        this.closeAfterDelete();
        break;
      case 'PaymentMethodUpdate':
        this.closeAfterUpdate();
        break;

      case 'TooExpensive':
        this.cancelSubscription();
        break;

      default: {
        break;
      }
    }
  }

  showAlert() {
    this.isShowAlert = true;
  }

  cancelSubscription() {
    let storageData = JSON.parse(sessionStorage.getItem('subscriptions'));
    let subscriptionIDs = storageData.map((res: any) => {
      return new subscriptions(res.id);
    });

    const httpCalls: any = subscriptionIDs.map((data: any) => this.dataService.cancelSubscription(data.id));
    const subscriptionList$ = forkJoin(httpCalls).pipe(map((results) => results.map((r: any) => ({ id: r.id }))));
    subscriptionList$.subscribe((res) => {
      this.closeModal();
    });
  }
}
