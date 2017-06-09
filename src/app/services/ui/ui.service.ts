import {DataTransferService} from "../data.transfer.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
/**
 * Created by Administrator on 2017/6/9.
 */

@Injectable()
export class UiService {

    confirmObserver: any;

    constructor(private dataTransferService: DataTransferService) {

        this.dataTransferService.confirmDialogData.subscribe(res => {
            this.confirmObserver.next(res);
            this.dataTransferService.confirmDialog.next({show: false});
        });

    }

    confirm(
        content: string,
        title:string | void = '提示'
    ): Observable<Boolean> {
        let observe = Observable.create(observer => {
            this.dataTransferService.confirmDialog.next({
                show: true,
                title: title,
                content: content
            });
            this.confirmObserver = observer;
        });
        return observe;
    }
}
