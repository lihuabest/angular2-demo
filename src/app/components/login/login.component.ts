/**
 * Created by Administrator on 2017/4/13.
 */

import {Component} from '@angular/core';
import {RequestService} from "../../plugins/request.service";


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

    httpClienPostClick() {
        this.requestService.postByHttpClient('/api/xx', {
            query: true,
            number: 1
        }).subscribe(data => {
            console.log(data);
        }, err => {
            console.log(err);
        });
    }
}
