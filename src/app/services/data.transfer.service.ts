import {Subject} from "rxjs/Subject";
import {Injectable} from "@angular/core";
import {ChartModel} from "../models/chartModel";
/**
 * Created by Administrator on 2017/6/9.
 */

@Injectable()
export class DataTransferService {

    confirmDialog: Subject<Object> = new Subject<Object>();
    confirmDialogData: Subject<boolean> = new Subject<boolean>();

    // 发生了图表拖拽
    chartDrop: Subject<string> = new Subject<string>();
    chartDropData: Subject<ChartModel> = new Subject<ChartModel>();

}
