/**
 * Created by LIHUA on 2017/7/8/008.
 */

import {Component} from "@angular/core";
import {CanvasCellInterface} from "../../../../../interfaces/canvas.cell.interface";
import {ChartModel} from "../../../../../models/chartModel";


@Component({
    selector: 'app-canvas-cell-bar-component',
    templateUrl: './canvas.cell.bar.component.html',
    styleUrls: ['./canvas.cell.bar.component.scss']
})
export class AppCanvasCellBarComponent implements CanvasCellInterface {

    option: ChartModel;

    echartsIntance: any;

    setOption(option: ChartModel) {
        this.option = option;
    }

    onChartInit(ec) {
        this.echartsIntance = ec;
    }
}
