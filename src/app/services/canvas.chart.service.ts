/**
 * Created by LIHUA on 2017/7/8/008.
 */

import {Injectable} from "@angular/core";
import {AppCanvasCellBarComponent} from "../module/canvas/components/cell/bar/cancas.cell.bar.component";

@Injectable()
export class CanvasChartService {
    private static cellTypes = {
        bar: AppCanvasCellBarComponent
    };

    getCellByType(type: string) {
        return CanvasChartService.cellTypes[type];
    }
}
