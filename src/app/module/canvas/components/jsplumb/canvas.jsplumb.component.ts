/**
 * Created by LIHUA on 2017/8/16.
 */
import {AfterContentInit, Component} from "@angular/core";
// import * as d3 from 'd3';
declare var jsPlumb: any;

@Component({
    selector: 'app-canvas-jsplumb-component',
    templateUrl: './canvas.jsplumb.component.html',
    styleUrls: ['canvas.jsplumb.component.scss']
})
export class AppCanvasJsplumbComponent implements AfterContentInit {

    constructor() {

    }

    ngAfterContentInit() {
        let items = document.querySelectorAll('.item');

        // jsPlumb.importDefaults({
        //     DragOptions: { cursor: 'pointer'}, // 拖动时鼠标停留在该元素上显示指针，通过css控制
        //     PaintStyle: { strokeStyle: '#666' }, // 元素的默认颜色
        //     EndpointStyle: { width: 20, height: 16, strokeStyle: '#666' }, // 连接点的默认颜色
        //     Endpoint: 'Rectangle', // 连接点的默认形状
        //     Anchors: ['TopCenter'] // 连接点的默认位置
        //     Connector: [ "Bezier", { curviness: 150 } ],
        //     Anchors: [ "TopCenter", "BottomCenter" ]
        // });



        jsPlumb.ready(function() {
            // jsPlumb.makeSource(items, {
            //     connector: 'StateMachine'
            // });
            // jsPlumb.makeTarget(items, {
            //     anchor: 'Continuous'
            // });

            let ins = jsPlumb.getInstance();

            ins.connect({
                source: items
            });
            ins.draggable(document.querySelectorAll('.item'))

        });

        // this.init();
    }

    init() {
        jsPlumb.ready(function() {
            jsPlumb.importDefaults({
                DragOptions : { cursor: 'pointer', zIndex: 2000 },
                PaintStyle : { strokeStyle: '#666' },
                EndpointStyle : { width: 20, height: 16, strokeStyle: '#666' },
                Endpoint : "Rectangle",
                Anchors : ["TopCenter"],
                // 控制是否有箭头
                ConnectionOverlays: [
                    [ "Arrow", { location: 1 } ],
                    [ "Label", {
                        location: 0.1,
                        id: "label",
                        cssClass: "aLabel"
                    }]
                ]
            });
            let exampleDropOptions = {
                hoverClass: "dropHover",
                activeClass: "dragActive"
            };

            let basicType = {
                connector: "StateMachine",
                paintStyle: { strokeStyle: "red", lineWidth: 4 },
                hoverPaintStyle: { strokeStyle: "blue" },
                overlays: [
                    "Arrow"
                ]
            };
            jsPlumb.registerConnectionType("basic", basicType);

            let color1 = "#316b31";
            let exampleEndpoint1 = {
                uuid: 101,
                endpoint: ["Dot", { radius: 11 }], // 连接点的形状、大小
                paintStyle: { fillStyle: color1 }, // 连接点的颜色
                isSource: true,
                scope: "green dot", // 点击该颜色的时候，其余该颜色的点都会显示虚线框
                connectorStyle: { strokeStyle: color1, lineWidth: 6 }, // 点与点之间连线颜色
                connector: ["Bezier", { curviness: 63 } ], // 线条形状，可弯曲
                maxConnections: 1,
                isTarget: true,
                dropOptions : exampleDropOptions
            };

            let exampleEndpoint11 = {
                uuid: 1011,
                endpoint: ["Dot", { radius: 11 }], // 连接点的形状、大小
                paintStyle: { fillStyle: color1 }, // 连接点的颜色
                isSource: true,
                scope: "green dot", // 点击该颜色的时候，其余该颜色的点都会显示虚线框
                connectorStyle: { strokeStyle: color1, lineWidth: 6 }, // 点与点之间连线颜色
                connector: ["Bezier", { curviness: 63 } ], // 线条形状，可弯曲
                maxConnections: 1,
                isTarget: true,
                dropOptions : exampleDropOptions,
                overlays: [
                    "Arrow"
                ]
            };
            let color2 = "rgba(229,219,61,0.5)";
            let exampleEndpoint2 = {
                uuid: 102,
                endpoint: "Rectangle",
                anchor: "BottomLeft", // 连接点的位置，可以被覆盖
                paintStyle: { fillStyle: color2, opacity: 0.5 },
                isSource: true,
                scope: 'yellow dot',
                connectorStyle: { strokeStyle: color2, lineWidth: 4 },
                connector : "Straight", // 线条形状，直线
                isTarget: true,
                dropOptions : exampleDropOptions,
                beforeDetach: function(conn) {
                    return confirm("Detach connection?");
                },
                onMaxConnections: function(info) {
                    alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
                }
            };

            let exampleEndpoint21 = {
                uuid: 1021,
                endpoint: "Rectangle",
                anchor: "BottomLeft", // 连接点的位置，可以被覆盖
                paintStyle: { fillStyle: color2, opacity: 0.5 },
                isSource: true,
                scope: 'yellow dot',
                connectorStyle: { strokeStyle: color2, lineWidth: 4 },
                connector : "Straight", // 线条形状，直线
                isTarget: true,
                dropOptions : exampleDropOptions,
                beforeDetach: function(conn) {
                    return confirm("Detach connection?");
                },
                onMaxConnections: function(info) {
                    alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
                }
            };

            // 左上角为起点，0.2表示相对x的偏移量，0.5表示相对y的偏移量
            let anchors = [[0.2, 0.5, 1, 0], [0.8, 1, 0, 1], [0, 0.8, -1, 0], [0.2, 0, 0, -1] ],
                maxConnectionsCallback = function(info) {
                    alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
                };
            let e1 = jsPlumb.addEndpoint("state2", { anchor: "LeftMiddle" }, exampleEndpoint11);
            e1.bind("maxConnections", maxConnectionsCallback);
            jsPlumb.addEndpoint("state1", exampleEndpoint1);
            jsPlumb.addEndpoint("state3", exampleEndpoint2);
            jsPlumb.addEndpoint("state1", {anchor: anchors}, exampleEndpoint21);

            // 固定连线
            jsPlumb.connect({uuids: [101, 1011]});
            jsPlumb.connect({uuids: [102, 1021]});

            // 可拖动
            jsPlumb.draggable(document.querySelectorAll('.item'));
        });
    }

}
