import { Component, Input } from '@angular/core';
import { FamilyBudgetDBService } from 'src/app/services/familyBudgetDB.service';
import { MovimentCategory } from 'src/app/classes/MovimentCategory';
import { MovimentTypes } from 'src/app/classes/MovimentsTypes';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'fb-categs-list',
    templateUrl: './fb-categs-list.component.html',
    styleUrls: ['./fb-categs-list.component.scss'],
})

export class FbCategsListComponent {
    @Input() set type(t: string) {
        this.loadCategories(t);
    }

    categories: IMovimentCategory[] = [];
    categoriesBackUp: IMovimentCategory[] = [];

    constructor(
        private appDBService: FamilyBudgetDBService,
        private modalCtrl: ModalController
    ) { }

    private async loadCategories(type: string) {
        if (type) {
            this.categories = await MovimentCategory.getEntries(this.appDBService, false, null, {
                entity: MovimentCategory.entityName,
                type,
                description: { $gte: '' } // workaround per ordinare per nome della categoria
            });
        } else {
            this.categories = await MovimentCategory.getEntries(this.appDBService, false, null, {
                entity: MovimentCategory.entityName,
                description: { $gte: '' } // workaround per ordinare per nome della categoria
            });
        }
        this.categoriesBackUp = [...this.categories];
    }

    /**
     * Metodo che restituisce la descrizione del tipo di movimento associato alla categoria
     * @param code Codice del tipo di movimento
     */
    public getTypeDescription(code: string): string {
        return MovimentTypes.getMovimentType(code).description;
    }

    /**
     * Effettua una ricerca testuale sulle categorie
     */
    searchCategories(event) {
        this.categories = this.categoriesBackUp;
        const searchTerm = event.srcElement.value;

        if (!searchTerm) {
            return;
        }

        this.categories = this.categories.filter(cat => {
            return (
                cat.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
            );
        });
    }

    public dismissModal() {
        this.modalCtrl.dismiss(null);
    }


}
