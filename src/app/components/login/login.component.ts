import {Component} from '@angular/core';
import {MdDialog} from "@angular/material";
import {RequestService} from "../../plugins/request.service";
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
        // http://192.168.0.143:8080/search/getEnZqInfo?query=abc&page=1&pageSize=10
        this.requestService.getByPromise('/api/data.json')
            .then(data => {
                let d = data.json();
                console.log(d);
            });
    }
}
