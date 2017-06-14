/**
 * Created by Administrator on 2017/6/13.
 */

import {Component} from "@angular/core";

@Component({
    selector: 'app-dialog-component',
    template: `
        <div>
            <button (click)="modalClick()">模态点击</button>
        </div>
    `
})

export class AppDialogComponent {
    modalClick: Function;
}
