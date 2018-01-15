/**
 * Created by LIHUA on 2017/8/16.
 */
import {AfterContentInit, Component, ElementRef, Renderer2, ViewChild} from "@angular/core";
import {ConnectOptions, JsplumbTool} from "../../../../plugins/jsplumb.tool";
import {leave} from "@angular/core/src/profile/wtf_impl";

/**
 * https://community.jsplumbtoolkit.com/doc/home.html 社区版api
 */
declare var jsPlumb: any;

@Component({
    selector: 'app-canvas-jsplumb-component',
    templateUrl: './canvas.jsplumb.component.html',
    styleUrls: ['canvas.jsplumb.component.scss']
})
export class AppCanvasJsplumbComponent implements AfterContentInit {

    ins: any;
    drapPos: any;

    tableIndex = 1;

    @ViewChild('targetContainer') targetContainer: ElementRef;

    constructor(private render: Renderer2) {

    }

    ngAfterContentInit() {
        // let items = document.querySelectorAll('.item');
        console.log(this.targetContainer.nativeElement);
        jsPlumb.importDefaults({
            Container: this.targetContainer.nativeElement,
            EndpointStyle: {radius: 3, fill: '#108EE9', stroke: '#CCDDEE', strokeWidth: 2},
            PaintStyle: {strokeWidth: 0.5, stroke: '#108ee9', outlineStroke: 'transparent', outlineWidth: 5},
            Connector: [ 'Bezier', { curviness: 65 } ],
            HoverPaintStyle: { stroke: 'orange' },
            ConnectionOverlays: [                                                   // 连接箭头
                ['Arrow', {width: 6, length: 6, location: 0.5}]
            ]
        });

        const _this = this;
        jsPlumb.ready(() => {

            _this.ins = jsPlumb.getInstance();

            _this.ins.draggable(document.querySelectorAll('.jsp-item'), {
                clone: true,
                drag: function (event) {
                    // console.log(event);
                    _this.drapPos = event.pos;
                },
            });

            _this.ins.droppable(document.querySelector('.jsp-target-container'), {
                drop: function (event) {
                    if (event.drag.el.classList.contains('origin')) {
                        _this.createItem(event);
                    }
                }
            });

            _this.ins.bind('connection', (data) => {
                console.log(data);
                if (data.source === data.target) {
                    _this.ins.deleteConnection(data.connection);
                    return;
                }

                if (data.connection.scope !== 'auto') {
                    let op = JsplumbTool.getConnectOptions({
                        source: data.source,
                        target: data.target,
                        anchors: ['RightMiddle', 'LeftMiddle'],
                        scope: 'auto'
                    } as ConnectOptions);
                    _this.ins.connect(op);

                    setTimeout(() => {
                        _this.ins.deleteConnection(data.connection);
                    });
                }
            });

        });
    }

    createItem(event: any) {
        let container = document.querySelector('.jsp-target-container');
        let div = document.createElement('div');
        div.classList.add('jsp-item');
        div.innerHTML = event.drag.el.innerHTML;
        div.style.backgroundColor = 'transparent';
        div.style.border = '0';

        let parentPosition = this.getAbsPoint(container);
        let x = this.drapPos[0] - parentPosition.x;
        let y = this.drapPos[1] - parentPosition.y;
        div.style.left = x + 'px';
        div.style.top = y + 'px';

        let header = document.createElement('div');
        header.classList.add('jsp-item-header');
        div.appendChild(header);

        let inner = document.createElement('div');
        inner.classList.add('jsp-item-inner');
        div.appendChild(inner);

        container.appendChild(div);

        // let cope element drag
        this.ins.draggable(div, {
            containment: container
        });

        // this.ins.addEndpoint(div, this.getEndPoint().firstPoint);

        this.ins.makeSource(inner, {
            anchor: ['Continuous', { faces: ['left', 'right'] } ]
        });
        this.ins.makeTarget(inner, {
            anchor: ['Continuous', { faces: ['left', 'right'] } ],
        });
    }

    getEndPoint() {
        let exampleDropOptions = {
            hoverClass: "dropHover", // 释放时指定鼠标停留在该元素上使用的css class
            activeClass: "dragActive" // 可拖动到的元素使用的css class
        };

        let firstPoint = {
            endpoint: ["Dot", { radius: 5 }], // 设置连接点的形状为圆形
            paintStyle: { fill: '#316b31' }, // 设置连接点的颜色
            isSource: true,  // 是否可以拖动（作为连线起点）
            scope: "green dot", // 连接点的标识符，只有标识符相同的连接点才能连接
            connectorStyle: { stroke: '#89bcde', strokeWidth: 2, fill: 'none' }, // 连线颜色、粗细
            connector: ["Bezier", { curviness: 63 } ], // 设置连线为贝塞尔曲线
            maxConnections: 1, // 设置连接点最多可以连接几条线
            isTarget: true,  // 是否可以放置（作为连线终点）
            dropOptions: exampleDropOptions, // 设置放置相关的css
        };

        let color2 = "rgba(229,219,61,0.5)";
        let secondPoint = {
            endpoint: "Rectangle",   // 设置连接点的形状为矩形
            anchor: "BottomLeft",    // 设置连接点的位置，左下角
            paintStyle: { fill: color2, opacity: 0.5 },   // 设置连接点的颜色、透明度
            isSource: true,  // 同上
            scope: 'yellow dot', // 同上
            connectorStyle: { strokeStyle: color2, lineWidth: 4}, // 同上
            connector : "Straight", // 设置连线为直线
            isTarget: true,  // 同上
            maxConnections: 3, // 同上
            dropOptions : exampleDropOptions, // 同上
            beforeDetach: function(conn) {   // 绑定一个函数，在连线前弹出确认框
                return confirm("Detach connection?");
            },
            onMaxConnections: function(info) { // 绑定一个函数，当到达最大连接个数时弹出提示框
                alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
            }
        };

        let thirdPoint = {
            anchor: [ "BottomCenter", "TopCenter" ],
            // endpoint: "Rectangle",
            endpoint: ["Dot", { radius: 5 }],
            paintStyle: { fill: '#316b31' },
            ConnectionOverlays: [
                [ "Arrow", { // 箭头的样式
                    location: 1,
                    visible: true,
                    width: 11,
                    length: 11,
                    id: "ARROW",
                }]
            ]
        };

        return {firstPoint, secondPoint, thirdPoint}
    }

    /**
     * 获取元素文档位置
     * @param element
     * @returns {{x: number; y: number}}
     */
    getAbsPoint(element: any) {
        let x = element.offsetLeft,
            y = element.offsetTop;
        while (element = element.offsetParent) {
            x += element.offsetLeft;
            y += element.offsetTop;
        }
        return {x, y};
    }

    addNewTable() {
        let container = this.targetContainer.nativeElement;

        let div = document.createElement('div');
        div.classList.add('drag-table');
        div.appendChild(this.addTableTitleSpan(div));

        this.ins.draggable(div, {
            containment: container,
            drag: (e) => {}
        });

        container.appendChild(div);
    }

    addTableTitleSpan(parent: any) {
        let span = document.createElement('span');
        span.innerHTML = 'table-' + this.tableIndex;
        this.tableIndex++;

        this.render.listen(span, 'click', (e) => {
            this.addTableRowSpan(parent);
        });

        return span;
    }

    addTableRowSpan(parent: any) {
        let span = document.createElement('span');
        span.innerHTML = 'inner';

        parent.appendChild(span);

        this.ins.makeTarget(span, {
            anchor: ['Continuous', {faces: ['left', 'right']}]
        });

        this.ins.makeSource(span, {
            anchor: ['Continuous', {faces: ['left', 'right']}]
        });
    }

    connectClick() {

    }
}
