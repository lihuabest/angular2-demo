/**
 * Created by LIHUA on 2017/7/7/007.
 */

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DragulaModule} from "ng2-dragula";
import {AngularEchartsModule} from "ngx-echarts";

import {AppCanvasCellsComponent} from "./components/cells/canvas.cells.component";
import {CanvasRoutesModule} from "./canvas.routes";
import {AppCanvasCellComponent} from "./components/cell/canvas.cell.component";
import {AppCanvasCellBarComponent} from "./components/cell/bar/cancas.cell.bar.component";
import {CanvasChartService} from "../../services/canvas.chart.service";
import {AppCanvasD3Component} from "./components/d3/canvas.d3.component";
import {AppCanvasD3PipeComponent} from "./components/d3/pipe/canvas.d3.pipe.component";
import {AppCanvasD3BarComponent} from "./components/d3/bar/canvas.d3.bar.component";
import {AppCanvasD3BarGroupComponent} from "./components/d3/bar.group/canvas.d3.bar.group.component";

@NgModule({
    imports: [
        CommonModule,
        CanvasRoutesModule,
        DragulaModule,
        AngularEchartsModule
    ],
    // 声明使用到了的组件
    declarations: [
        AppCanvasCellsComponent,
        AppCanvasCellComponent,
        AppCanvasCellBarComponent,
        AppCanvasD3Component,
        AppCanvasD3PipeComponent,
        AppCanvasD3BarComponent,
        AppCanvasD3BarGroupComponent
    ],
    // 声明没有在模板中使用的组件，可能是动态使用的组件
    entryComponents: [
        // AppCanvasCellsComponent,
        // AppCanvasCellComponent,
        AppCanvasCellBarComponent,
        // AppCanvasD3Component
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
