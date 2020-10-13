import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'fb-categs-card-list-itm',
    templateUrl: './fb-categs-card-list-itm.component.html',
    styleUrls: ['./fb-categs-card-list-itm.component.scss'],
})

export class FbCategCardListItmComponent {

    @Input() category;
    @Output() itemClicked = new EventEmitter();

    constructor() { }

    public clickItem(category) {
        this.itemClicked.emit(category);
    }

}
