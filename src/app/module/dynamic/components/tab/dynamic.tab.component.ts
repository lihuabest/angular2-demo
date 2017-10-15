/**
 * Created by Administrator on 2017/10/15.
 */
import {Component, Renderer2} from "@angular/core";

@Component({
    selector: 'app-dynamic-tab-component',
    template: `
        <button (click)="set()">set value</button>
        <button (click)="remove()">remove value</button>
    `
})
export class AppDynamicTabComponent {

    STORENAME = 'islogin';

    constructor(private render: Renderer2) {
        this.initMessageEvent();
    }

    initMessageEvent() {
        this.render.listen(window, 'storage', (event) => {
            console.log(event);
            if (event.key === 'message') {

            }
        });
    }

    set() {
        window.localStorage.setItem(this.STORENAME, 'true');
    }

    remove() {
        window.localStorage.removeItem(this.STORENAME);
    }
}
