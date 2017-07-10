/**
 * Created by LIHUA on 2017/7/7/007.
 */

import {
    Component, ComponentFactoryResolver, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,
    ViewContainerRef
} from "@angular/core";
import {DragulaService} from "ng2-dragula";
import {Subscription} from "rxjs/Subscription";
import {CellModel} from "../../../../models/cell.model";
import {DataTransferService} from "../../../../services/data.transfer.service";
import {CanvasChartService} from "../../../../services/canvas.chart.service";

/**
 * 定义传递参数
 */
export class CellEventEmitterInterface {
    // 传递的cell
    cell: CellModel;
    // 点击事件
    event: MouseEvent;
}

@Component({
    selector: 'app-canvas-cell-component',
    templateUrl: './canvas.cell.component.html',
    styleUrls: ['canvas.cell.component.scss']
})
export class AppCanvasCellComponent implements OnInit, OnDestroy {
    // 画布基本信息
    @Input()
    cell: CellModel;
    // 画布移动
    @Output()
    cellMove: EventEmitter<CellEventEmitterInterface> = new EventEmitter();
    // 画布resize
    @Output()
    cellResize: EventEmitter<CellEventEmitterInterface> = new EventEmitter();
    // chartDropData subscribe
    chartDropDataSubscription: Subscription;

    dynamicChartInstance: any;

    @ViewChild('dynamicChart', { read: ViewContainerRef })
    dynamicChart: ViewContainerRef;

    constructor (
        private dragulaService: DragulaService,
        private dataTransferService: DataTransferService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private canvasChartService: CanvasChartService
    ) {

        this.dragulaService.drop.subscribe(args => {
            let [el, target, source] = args;

            // cancel drag
            this.dragulaService.find('drag').drake.cancel(true);

            this.dataTransferService.chartDrop.next('chart drop success');
        });

        this.dragulaService.over.subscribe(args => {
            let [el, target, source] = args;

            if (source.classList.contains('content')) {
                setTimeout(() => {
                    [].forEach.call(source.querySelectorAll('.drag-cell'), item => {
                        item.style['display'] = 'none';
                    });
                });
            }

            // console.log(source);
        });

        this.chartDropDataSubscription = this.dataTransferService.chartDropData.subscribe(chart => {
            this.dynamicChart.clear();

            const dynamicChartComponent = this.canvasChartService.getCellByType(chart.type);
            if (dynamicChartComponent) {
                const dynamicChartFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicChartComponent);

                this.dynamicChartInstance = this.dynamicChart.createComponent(dynamicChartFactory).instance;

                this.dynamicChartInstance.setOption(chart);
            }
        });
    }

    ngOnInit() {
        // console.log(this.cell)
    }

    ngOnDestroy() {
        // unsubscribe chartDropData
        this.chartDropDataSubscription.unsubscribe();

        if (this.dynamicChartInstance) {
            this.dynamicChartInstance.destroy();
        }
    }

    /**
     * 开始移动
     * @param $event
     */
    cellMoveStart($event: MouseEvent) {
        this.cellMove.emit({
            cell: this.cell,
            event: $event
        });
    }

    /**
     * 开始缩放
     * @param $event
     */
    cellResizeStart($event: MouseEvent) {
        this.cellResize.emit({
            cell: this.cell,
            event: $event
        });
    }

}
