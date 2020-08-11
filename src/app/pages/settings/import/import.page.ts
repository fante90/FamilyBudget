import { Component } from '@angular/core';
import { FamilyBudgetDBService } from 'src/app/services/familyBudgetDB.service';
import { UIService } from 'src/app/services/ui.service';
import { UtilityService } from 'src/app/services/utility.service';
import { MovimentCategory } from 'src/app/classes/MovimentCategory';
import { Moviment } from 'src/app/classes/Moviment';

@Component({
  selector: 'app-import',
  templateUrl: './import.page.html',
  styleUrls: ['./import.page.scss'],
})
export class ImportPage {

  private importType: number;
  constructor(private appDBService: FamilyBudgetDBService, private uiService: UIService, private utilityService: UtilityService) { }

  downloadMovModel() {
    const modelStr = 'id_category;type;date;note;value;\n';
    this.utilityService.download(
      modelStr,
      'ImportMovimenti.csv',
      'text/plain');
  }

  downloadCatModel() {
    const modelStr = 'description;type;color;icon;\n';
    this.utilityService.download(
      modelStr,
      'ImportCategorie.csv',
      'text/plain');
  }

  importData(dataType) {
    this.importType = dataType;
    document.getElementById('importFile').click();
  }

  confImportData(event) {
    const file = event.target.files[0];
    event.target.value = null;
    if (file) {
      this.uiService.presentAlert({
        header: 'Import ' + ((this.importType === 0) ? 'Movimenti' : 'Categorie'),
        message: 'Sei sicuro di voler procedere?',
        buttons: [
          {
            text: 'Annulla',
            role: 'cancel',
            cssClass: 'medium'
          }, {
            text: 'Conferma',
            handler: () => {
              this.completeImportData(file);
            }
          }
        ]
      });
    }
  }

  async completeImportData(file) {
    if (file) {
      const loadingAlert = await this.uiService.presentAlert({ message: 'Import in corso...' });
      const reader = new FileReader();
      reader.onload = async (res: any) => {
        const rows: Array<any> = res.target.result.split('\n');
        if (rows && rows.length > 1) {
          let processed = 0;
          let valids = 0;
          let errors = 0;
          let index = 0;
          while (rows.length > index) {
            if (index > 0) { // skippo la prima riga che contiene l'intestazione delle colonne
              processed++;
              const rowData: Array<any> = rows[index].split(';');
              if (this.importType === 0) {
                // import movimenti
                if (rowData.length >= 5) {
                  const newRowModel = {
                    _id: null,
                    id_category: MovimentCategory.entityName + ':' + ('00000' + rowData[0]).slice(-6),
                    type: rowData[1],
                    date: this.elabDate(rowData[2]),
                    note: rowData[3],
                    value: this.elabValue(rowData[4])
                  };
                  const moviment = new Moviment(this.appDBService);
                  moviment.modelToEntity(newRowModel);
                  if (!await moviment.valid()) {
                    errors++;
                  } else {
                    const result = await moviment.save();
                    if (result === false) {
                      errors++;
                    } else {
                      valids++;
                    }
                  }
                } else {
                  // Per non dare errore sull'eventuale ultima riga vuota
                  if (!(rowData.length === 0 || (rowData.length === 1 && rowData[0] === ''))) {
                    errors++;
                  } else {
                    processed--;
                  }
                }
              } else {
                // import categorie
                if (rowData.length >= 4) {
                  const newRowModel = {
                    _id: null,
                    description: rowData[0],
                    type: rowData[1],
                    color: rowData[2],
                    icon: rowData[3]
                  };
                  const movimentCategory = new MovimentCategory(this.appDBService);
                  movimentCategory.modelToEntity(newRowModel);
                  if (!await movimentCategory.valid()) {
                    errors++;
                  } else {
                    const result = await movimentCategory.save();
                    if (result === false) {
                      errors++;
                    } else {
                      valids++;
                    }
                  }
                } else {
                  // Per non dare errore sull'eventuale ultima riga vuota
                  if (!(rowData.length === 0 || (rowData.length === 1 && rowData[0] === ''))) {
                    errors++;
                  } else {
                    processed--;
                  }
                }
              }
            }
            index++;
          }
          loadingAlert.dismiss();
          this.uiService.presentAlert({
            header: 'Import completato',
            message: 'Processati: ' + processed + '\nValidi: ' + valids + '\nErrori: ' + errors,
            buttons: [
              {
                text: 'Chiudi',
                role: 'cancel',
                cssClass: 'primary'
              }
            ]
          });
        }
      };
      reader.readAsText(file);
    }
  }

  private elabDate(dateStr) {
    const dateParts = dateStr.split('/');
    if (dateParts.length === 3) {
      return new Date(parseInt(dateParts[2], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[0], 10));
    } else {
      return new Date();
    }
  }

  private elabValue(valueStr: string) {
    if (valueStr.indexOf('.') >= 0 && valueStr.indexOf(',') >= 0) {
      valueStr = valueStr.replace('.', '.');
    }
    return parseFloat(valueStr.replace(',', '.'));
  }
}
