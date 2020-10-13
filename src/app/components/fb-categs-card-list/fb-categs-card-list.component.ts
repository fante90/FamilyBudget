import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'fb-categs-card-list',
    templateUrl: './fb-categs-card-list.component.html',
    styleUrls: ['./fb-categs-card-list.component.scss'],
})

export class FbCategCardListComponent {

    @Input() categories = [];
    @Output() itemClicked = new EventEmitter();

    constructor() { }

    public itemClickedInt(category) {
        this.itemClicked.emit(category);
    }
}
