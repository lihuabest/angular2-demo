/**
 * Created by LIHUA on 2017/7/7/007.
 */

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DragulaModule} from "ng2-dragula";
import * as echarts from 'echarts';
import {AngularEchartsModule} from "ngx-echarts";

import {AppCanvasCellsComponent} from "./components/cells/canvas.cells.component";
import {CanvasRoutesModule} from "./canvas.routes";
import {AppCanvasCellComponent} from "./components/cell/canvas.cell.component";
import {AppCanvasCellBarComponent} from "./components/cell/bar/cancas.cell.bar.component";
import {CanvasChartService} from "../../services/canvas.chart.service";

@NgModule({
    imports: [
        CommonModule,
        CanvasRoutesModule,
        DragulaModule,
        AngularEchartsModule
    ],
    declarations: [
        AppCanvasCellsComponent,
        AppCanvasCellComponent,
        AppCanvasCellBarComponent
    ],
    entryComponents: [
        AppCanvasCellsComponent,
        AppCanvasCellComponent,
        AppCanvasCellBarComponent
    ],
    exports: [
        AppCanvasCellsComponent
    ],
    providers: [
        CanvasChartService
    ]
})
export class CanvasModule {

}
