/**
 * Created by LIHUA on 2017/7/21/021.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RequestService {

    constructor(private http: Http) {

    }

    async getByPromise(url: string, options?: any ): Promise<any> {
        return await this.http.get(url, options).toPromise();
    }
}
