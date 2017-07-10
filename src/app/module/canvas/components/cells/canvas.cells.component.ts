/**
 * Created by LIHUA on 2017/7/7/007.
 */

import {AfterViewInit, Component, OnDestroy, OnInit} from "@angular/core";
import {CellModel} from "../../../../models/cell.model";
import {CellEventEmitterInterface} from "../cell/canvas.cell.component";
import {ChartModel} from "../../../../models/chartModel";
import {DragulaService} from "ng2-dragula";
import {DataTransferService} from "../../../../services/data.transfer.service";
import {Subscription} from "rxjs/Subscription";
import {BarData} from "../cell/bar/bar.data";

@Component({
    selector: 'app-canvas-cells-component',
    templateUrl: './canvas.cells.component.html',
    styleUrls: ['./canvas.cells.component.scss']
})
export class AppCanvasCellsComponent implements OnInit, AfterViewInit, OnDestroy {
    // 存放画块数据的数组
    cells: Array<CellModel> = [];

    // move or resize cell
    cellChange: CellModel;
    // is moving
    cellMoving: boolean = false;
    // is resizing
    cellResizing: boolean = false;
    // change start x value
    cellChangeStartX: number;
    // change start y value
    cellChangeStartY: number;

    // chart已经存在，正在被拖动或者resize
    cellChartInstance: any;

    // 事件处理器
    eventsHandler = {};

    // 图标数据
    charts: Array<ChartModel> = [];
    // 当前被移动的chart
    chartDrag: ChartModel;
    // chart subscription
    chartDropSubsubscribe: Subscription;

    barDatas: any;

    constructor (
        private dragulaService: DragulaService,
        private dataTransferService: DataTransferService
    ) {

        this.dragulaService.setOptions('drag', {
            removeOnSpill: true,
            copy: function (el, source) {
                return true;
            },
            moves: function (el: any, container: any, handle: any): any {
                return true;
            }
        });

        // cell通知 drag完成
        this.chartDropSubsubscribe = this.dataTransferService.chartDrop.subscribe(() => {
            // 发生drag数据
            this.dataTransferService.chartDropData.next(this.chartDrag);
        });

    }

    ngOnInit() {
        this.barDatas = BarData.datas;

        this.charts.push({
            title: '柱状图',
            type: 'bar',
            datas: this.barDatas
        } as ChartModel);
    }

    ngAfterViewInit() {
        this.eventsHandler['mousemove'] = (e) => {
            this.handleMouseMove(e);
        };
        this.eventsHandler['mouseup'] = (e) => {
            this.handleMouseUp(e);
        };

        document.body.addEventListener('mousemove', this.eventsHandler['mousemove'], false);
        document.body.addEventListener('mouseup', this.eventsHandler['mouseup'], false);
    }

    ngOnDestroy() {
        document.body.removeEventListener('mousemove', this.eventsHandler['mousemove']);
        document.body.removeEventListener('mouseup', this.eventsHandler['mousemove']);

        this.chartDropSubsubscribe.unsubscribe();
    }

    /**
     * 添加画布
     */
    addCell() {
        let cell = new CellModel({
            zIndex: this.getMaxZindex()
        });

        this.cells.push(cell);
    }

    /**
     * 获取画布里最大的zindex
     */
    getMaxZindex() {
        let max = 0;

        this.cells.forEach(cell => {
            max = (max >= cell.zIndex) ? max : cell.zIndex;
        });

        return max + 1;
    }

    /**
     * 鼠标移动
     * @param emitter
     */
    onCellMove(emitter: CellEventEmitterInterface) {
        this.cellMoving = true;
        this.cellChange = emitter.cell;
        this.cellChangeStartX = emitter.event.pageX;
        this.cellChangeStartY = emitter.event.pageY;
        this.cellChange.zIndex = this.getMaxZindex();
    }

    /**
     * cell resize
     * @param emitter
     */
    onCellResize(emitter: CellEventEmitterInterface) {
        this.cellResizing = true;
        this.cellChange = emitter.cell;
        this.cellChangeStartX = emitter.event.pageX;
        this.cellChangeStartY = emitter.event.pageY;
        this.cellChange.zIndex = this.getMaxZindex();

        this.cellChartInstance = emitter.chartInstance;
    }

    /**
     * 处理移动结束
     * @param $event
     */
    handleMouseMove($event: MouseEvent) {
        if (this.cellMoving || this.cellResizing) {
            // 移动的绝对值
            let absChangeX = $event.pageX - this.cellChangeStartX;
            let absChangeY = $event.pageY - this.cellChangeStartY;

            // 缓存开始移动位置
            this.cellChangeStartX = $event.pageX;
            this.cellChangeStartY = $event.pageY;

            if (this.cellMoving) {
                // move
                this.cellChange.left = this.cellChange.left + absChangeX;
                this.cellChange.top = this.cellChange.top + absChangeY;
            } else {
                // resize
                this.cellChange.width = this.cellChange.width + absChangeX;
                this.cellChange.height = this.cellChange.height + absChangeY;

                // echart resize
                if (this.cellChartInstance && this.cellChartInstance.echartsIntance) {
                    this.cellChartInstance.echartsIntance.resize();
                }
            }
        }
    }

    /**
     * 处理鼠标弹出
     * @param $event
     */
    handleMouseUp($event: MouseEvent) {
        if (this.cellMoving || this.cellResizing) {
            this.cellMoving = false;
            this.cellResizing = false;

            this.cellChartInstance = null;
        }
    }

    /**
     * 开始拖拽
     * @param chart
     */
    onDragStart(chart: ChartModel) {
        this.chartDrag = chart;
    }

}
