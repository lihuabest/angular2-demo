/**
 * Created by LIHUA on 2017/7/21/021.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class RequestService {

    constructor(private http: Http,
                private httpClient: HttpClient) {

    }

    async getByPromise(url: string, options?: any ): Promise<any> {
        return await this.http.get(url, options).toPromise();
    }

    getByHttpClient(url, options?: any): Observable<any> {
        return this.httpClient.get(url, {
            params: options
        });
    }

    async getByHttpClientPromise(url, options?: any): Promise<any> {
        return await this.httpClient.get(url, {
            params: options
        }).toPromise();
    }
}
