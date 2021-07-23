import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-account',
  templateUrl: './cancel-account.component.html',
  styleUrls: ['./cancel-account.component.scss'],
})
export class CancelAccountComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {}

  radioChange(e: any) {}

  cancel() {
    this.route.navigate(['/cancellation']);
  }
}
