import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@app/@shared/services/data.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  customerId: any;
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.route.queryParams.subscribe((res: any) => {
      this.customerId = res.customerId;
      this.getCustomerCharges();
    });
  }

  ngOnInit(): void {}

  getCustomerCharges() {
    this.dataService.getCustomerCharges(this.customerId).subscribe(
      (res: any) => {
        window.open(res.data[0].receipt_url, '_blank');
      },
      (error) => {}
    );
  }
}
