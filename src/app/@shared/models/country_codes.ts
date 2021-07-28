import { Injectable } from '@angular/core';

export class CountryCodes {
  constructor(public code: string) {}
  static adapt(item: any): CountryCodes {
    return item.supported_transfer_countries.map((item: any) => {
      return new CountryCodes(item);
    });
  }
}
