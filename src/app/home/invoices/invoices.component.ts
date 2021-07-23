import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@app/@shared/services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit {
  customerId: string = '';
  invoiceData: any;
  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe((res: any) => {
      this.customerId = res.customerId;
      this.getInvoices();
    });
  }

  ngOnInit(): void {}

  getInvoices() {
    this.dataService.getInvoices(this.customerId).subscribe((res: any) => {
      res.data.forEach((element: any) => {
        element.date = moment.unix(element.period_start).format('DD/MM/yyyy');
      });
      this.invoiceData = res.data;
    });
  }

  downloadInvoice(url: string) {
    window.open(url, '_blank');
  }
}
