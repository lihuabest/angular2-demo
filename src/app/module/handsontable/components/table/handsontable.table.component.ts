declare var Handsontable: any;
import {Component, ElementRef, Input, NgZone, OnInit} from "@angular/core";

@Component({
    selector: 'app-handsontable-table-component',
    template: `
        <div class="mb10">
            <button class="mr5 mb5" (click)="getData()">获取数据</button>
            <button class="mr5 mb5" (click)="clearData()">清空数据</button>
            <button class="mr5 mb5 handsontable-btn alignCenter">居中</button>
        </div>
    `
})
export class HandsontableTableComponent implements OnInit {
    view: HTMLElement;

    init: any;

    @Input()
    options: any;

    activatedCell: any;

    constructor(private element: ElementRef,
                private ngZone: NgZone) {
    }

    ngOnInit() {
        let options = Object.assign(this.options, this.getDefaultOptions());
        this.view = document.createElement('div');
        this.view.className = 'handsontable-container';
        this.element.nativeElement.appendChild(this.view);

        this.ngZone.runOutsideAngular(() => {
            this.init = new Handsontable(this.view, options);

            this.init.addHook('afterOnCellMouseDown', (event, coords, td) => {
                this.activatedCell = {
                    event,
                    coords,
                    td
                }
            });

            this.init.addHook('afterDeselect', () => {
                this.activatedCell = null;
            });

            let alignCenter = this.element.nativeElement.querySelector('.alignCenter');
            Handsontable.dom.addEvent(alignCenter, 'click', () => {
                // 重置配置参数
                // this.init.updateSettings({
                //     rowHeaders: false
                // });

                if (this.activatedCell) {
                    // 设置cell属性
                    this.init.setCellMeta(this.activatedCell.coords.row, this.activatedCell.coords.col, 'className', 'htCenter');
                    // 重新渲染table
                    this.init.render();
                }

            });

        });
    }

    getDefaultOptions() {
        return {
            // 外部点击是否取消cell的选中状态等 这里自定义的按钮就不需要取消选中状态
            outsideClickDeselects: function (e: HTMLElement) {
                return !e.classList.contains('handsontable-btn');
            }
        }
    }

    // 获取数据
    getData() {
        let data = this.init.getData();
        alert(JSON.stringify(data));
    }

    clearData() {
        this.init.clear();
    }

}
