import { Component, OnInit } from '@angular/core';
import { version, author } from '../../../../../package.json';
import { FamilyBudgetDBService } from './../../../services/familyBudgetDB.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  appVersion: string;
  appAuthor: string;
  dbVersion: string;

  constructor(private appDBService: FamilyBudgetDBService) {
    this.appVersion = version;
    this.appAuthor = author;
  }

  async ngOnInit() {
    let currDbVersionDoc = null;
    try {
      currDbVersionDoc = await this.appDBService.getEntry('DbVersion:000001');
    } catch (_) { }
    this.dbVersion = (currDbVersionDoc) ? currDbVersionDoc.DbVersion : '0.0.0';
  }

}
