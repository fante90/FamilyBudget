import { Component } from '@angular/core';
import { version, author } from '../../../../../package.json';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage {
  appVersion: string;
  appAuthor: string;

  constructor() {
    this.appVersion = version;
    this.appAuthor = author;
  }

}
