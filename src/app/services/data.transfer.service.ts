import {Subject} from "rxjs/Subject";
import {Injectable} from "@angular/core";
/**
 * Created by Administrator on 2017/6/9.
 */

@Injectable()
export class DataTransferService {

    confirmDialog: Subject<Object> = new Subject<Object>();
    confirmDialogData: Subject<boolean> = new Subject<boolean>();

}
