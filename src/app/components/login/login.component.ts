import {Component} from '@angular/core';
import {DragulaService} from "ng2-dragula";
/**
 * Created by Administrator on 2017/4/13.
 */

@Component({
    selector: 'app-login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

export class LoginComponent {
    public many: Array<string> = ['The', 'possibilities', 'are', 'endless!'];
    public many2: Array<string> = ['Explore', 'them'];

    constructor(private dragulaService: DragulaService) {
        dragulaService.dropModel.subscribe((value) => {
            this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe((value) => {
            this.onRemoveModel(value.slice(1));
        });
    }

    onDropModel(args) {
        let [el, target, source] = args;
        console.log(el, target, source);
    }

    onRemoveModel(args) {
        let [el, source] = args;
        console.log(args);
    }

}
