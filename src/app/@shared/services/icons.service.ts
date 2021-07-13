import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

interface ICON {
  name: String;
  path: String;
}

// TODO: add new icon in this list
const icons: ICON[] = [
  { name: 'dashboard', path: '/assets/Group 9594.svg' },
  { name: 'icon-left', path: '/assets/icon-left.svg' },
  { name: 'icon-right', path: '/assets/icon-right.svg' },
  { name: 'cancel', path: '/assets/cancel.svg' },
  { name: 'img-edit', path: '/assets/img-edit.svg' },
  { name: 'sub-head', path: '/assets/Ellipse 570 (1).svg' },
  { name: 'custom_oval', path: '/assets/custom_circle.svg' },
  { name: 'gray-circle', path: '/assets/gray-circle.svg' },

  { name: 'content-management', path: '/assets/Group 9595.svg' },
  {
    name: 'category-management',
    path: '/assets/_icons/Category Management.svg',
  },
  { name: 'payment-management', path: '/assets/_icons/Payment Management.svg' },
  {
    name: 'profession-management',
    path: '/assets/_icons/Profession Management.svg',
  },
  {
    name: 'monthly-reports',
    path: '/assets/updated-icons/Monthly Reports.svg',
  },
  {
    name: 'customer-support',
    path: '/assets/updated-icons/Customer Support.svg',
  },
  { name: 'discount', path: '/assets/_icons/Discount.svg' },
  { name: 'extra-pages', path: '/assets/_icons/Extra Pages.svg' },
  { name: 'calender', path: '/assets/fi-rr-calendar.svg' },

  { name: 'user-database', path: '/assets/Group 9597.svg' },
  { name: 'admin-management', path: '/assets/Group 9594-1.svg' },
  { name: 'sub-menu', path: '/assets/sub-menu.svg' },
  { name: 'edit', path: '/assets/icons/Edit.svg' },
  { name: 'delete', path: '/assets/icons/Delete.svg' },
  { name: 'lock', path: '/assets/icons/Lock.svg' },
  { name: 'view', path: '/assets/icons/View.svg' },
  { name: 'edit_inline', path: '/assets/_icons/Edit.svg' },
];

@Injectable({
  providedIn: 'root',
})
export class IconsService {
  baseURL = '';

  constructor(public iconRegistry: MatIconRegistry, public sanitizer: DomSanitizer) {
    // base url depends on the enviorment. it is your site domain
    // like http://localhost:4200 or http://example.com
    this.baseURL = window.location.origin;
  }

  registerIcons() {
    //registered your icons
    icons.forEach((e: any) => {
      this.iconRegistry.addSvgIcon(e.name, this.sanitizer.bypassSecurityTrustResourceUrl(this.baseURL + e.path));
    });
  }
}
