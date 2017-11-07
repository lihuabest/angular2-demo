import {Component} from '@angular/core';
import {MdDialog} from "@angular/material";
import {RequestService} from "../../plugins/request.service";
import {error} from "selenium-webdriver";
/**
 * Created by Administrator on 2017/4/13.
 */

@Component({
    selector: 'app-login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

export class LoginComponent {

    constructor(private requestService: RequestService) {}

    proxyClick() {
        this.requestService.getByPromise('/api/tsconfig.app.json')
            .then(data => {
                let d = data.json();
                console.log(d);
            });
    }

    httpClienSubscribeClick() {
        this.requestService.getByHttpClient('/api/tsconfig.app.json').subscribe(data => {
            console.log(data);
        }, err => {
            console.log(err);
        });
    }

    async httpClienPromiseClick() {
        // this.requestService.getByHttpClientPromise('/api/tsconfig.app.json').then(data => {
        //     console.log(data);
        // }, err => {
        //     console.log(err);
        // });

        let data = await this.requestService.getByHttpClientPromise('/api/tsconfig.app.json');
        console.log(data);
    }
}
