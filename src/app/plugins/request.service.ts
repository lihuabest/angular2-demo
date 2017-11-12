/**
 * Created by LIHUA on 2017/7/21/021.
 */

import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

    postByHttpClient(url, options?: any): Observable<any> {
        return this.httpClient.post(url, this.parseToURLSearchParams(options), {
            headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'})
        });
    }

    /**
     * 把对象变成查询参数
     * @param data
     * @returns {URLSearchParams}
     */
    parseToURLSearchParams(data: Object): string {
        const searchParams = new URLSearchParams();

        Object.keys(data).forEach(key => {
            searchParams.set(key, data[key]);
        });

        return searchParams.toString();
    }
}
