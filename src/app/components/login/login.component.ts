import {Component} from '@angular/core';
import {MdDialog} from "@angular/material";
import {AppDialogComponent} from "../../services/dialog/dialog.component";
/**
 * Created by Administrator on 2017/4/13.
 */

@Component({
    selector: 'app-login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

export class LoginComponent {

    constructor(private dialog: MdDialog) {}

    dialogClick() {
        this.dialog.open(AppDialogComponent);
    }
}
