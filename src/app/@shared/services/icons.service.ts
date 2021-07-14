import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

interface ICON {
  name: String;
  path: String;
}

// TODO: add new icon in this list
const icons: ICON[] = [{ name: 'pdf', path: '/assets/pdf.svg' }];

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
