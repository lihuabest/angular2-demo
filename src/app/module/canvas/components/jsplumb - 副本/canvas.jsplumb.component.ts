/**
 * Created by LIHUA on 2017/8/16.
 */
import {AfterContentInit, Component} from "@angular/core";
// import * as d3 from 'd3';
declare let jsPlumb: any;
declare let jQuery: any;

let $ = jQuery;

@Component({
    selector: 'app-canvas-jsplumb-component',
    templateUrl: './canvas.jsplumb.component.html',
    styleUrls: ['canvas.jsplumb.component.scss']
})
export class AppCanvasJsplumbComponent implements AfterContentInit {

    constructor() {

    }

    ngAfterContentInit() {
        this.init();
    }

    save() {
        let connects = [];
        $.each(jsPlumb.getAllConnections(), function (idx, connection) {
            let cont = connection.getLabel();
            connects.push({
                ConnectionId: connection.id,
                PageSourceId: connection.sourceId,
                PageTargetId: connection.targetId,
                SourceText: connection.source.innerText,
                TargetText: connection.target.innerText,
                SourceAnchor: connection.endpoints[0].anchor.type,
                TargetAnchor: connection.endpoints[1].anchor.type,
                ConnectText: $(cont).html()
            });
        });
        let blocks = [];
        $("#right .node").each(function (idx, elem) {
            let $elem = $(elem);
            blocks.push({
                BlockId: $elem.attr('id'),
                BlockContent: $elem.html(),
                BlockX: parseInt($elem.css("left"), 10),
                BlockY: parseInt($elem.css("top"), 10)
            });
        });

        let serliza = JSON.stringify(connects) + "&" + JSON.stringify(blocks);
        console.log(connects);
        console.log(blocks);
        console.log(serliza);

        // $.ajax({
        //     type: "post",
        //     url: "ajax.aspx",
        //     data: { id: serliza },
        //     success: function (filePath) {
        //         window.open("show-flowChart.aspx?path=" + filePath);
        //     }
        // });
    }

    init() {
        let ins = jsPlumb.getInstance();

        function doubleclick(id) {
            $(id).dblclick(function () {
                let text = $(this).text();
                $(this).html("");
                $(this).append("<input type='text' value='" + text + "' />");
                $(this).mouseleave(function () {
                    $(this).html($("input[type='text']").val());
                });
            });
        }

        $('#left').children().draggable({
            helper: "clone",
            scope: "ss",
        });

        let i = 0;
        $('#right').droppable({
            scope: 'ss',
            drop: function (event, ui) {
                let left = parseInt((ui.offset.left - $(this).offset().left) + '', 10);
                let top = parseInt((ui.offset.top - $(this).offset().top) + '', 10);
                let name = ui.draggable[0].id;

                switch (name) {
                    case 'node1':
                        i++;
                        let id = 'state_start' + i;
                        $(this).append('<div class="node" style="border-radius: 25em" id="' + id + '" >' + $(ui.helper).html() + '</div>');
                        $("#" + id).css("left", left).css("top", top);
                        // jsPlumb.addEndpoint(id, { anchors: "TopCenter" }, hollowCircle);
                        // jsPlumb.addEndpoint(id, { anchors: "RightMiddle" }, hollowCircle);
                        jsPlumb.addEndpoint(id, { anchors: "BottomCenter" }, hollowCircle);
                        // jsPlumb.addEndpoint(id, { anchors: "LeftMiddle" }, hollowCircle);
                        jsPlumb.draggable(id);
                        $("#" + id).draggable({ containment: "parent" });
                        doubleclick("#" + id);
                        break;
                    case "node2":
                        i++;
                        id = "state_flow" + i;
                        $(this).append("<div class='node' id='" + id + "'>" + $(ui.helper).html() + "</div>");
                        $("#" + id).css("left", left).css("top", top);
                        jsPlumb.addEndpoint(id, { anchors: "TopCenter" }, hollowCircle);
                        // jsPlumb.addEndpoint(id, { anchors: "RightMiddle" }, hollowCircle);
                        // jsPlumb.addEndpoint(id, { anchors: "BottomCenter" }, hollowCircle);
                        // jsPlumb.addEndpoint(id, { anchors: "LeftMiddle" }, hollowCircle);
                        jsPlumb.addEndpoint(id, hollowCircle);
                        jsPlumb.draggable(id);
                        $("#" + id).draggable({ containment: "parent" });
                        doubleclick("#" + id);
                        break;
                    case "node3":
                        i++;
                        id = "state_decide" + i;
                        $(this).append("<div class='node' id='" + id + "'>" + $(ui.helper).html() + "</div>");
                        $("#" + id).css("left", left).css("top", top);
                        jsPlumb.addEndpoint(id, { anchors: "TopCenter" }, hollowCircle);
                        // jsPlumb.addEndpoint(id, { anchors: "RightMiddle" }, hollowCircle);
                        // jsPlumb.addEndpoint(id, { anchors: "BottomCenter" }, hollowCircle);
                        // jsPlumb.addEndpoint(id, { anchors: "LeftMiddle" }, hollowCircle);
                        jsPlumb.addEndpoint(id, hollowCircle);
                        jsPlumb.draggable(id);
                        $("#" + id).draggable({ containment: "parent" });
                        doubleclick("#" + id);
                        break;
                    case "node4":
                        i++;
                        id = "state_end" + i;
                        $(this).append('<div class="node" style="border-radius: 25em"  id="' + id + '" >' + $(ui.helper).html() + '</div>');
                        $("#" + id).css("left", left).css("top", top);
                        jsPlumb.addEndpoint(id, { anchors: "TopCenter" }, hollowCircle);
                        // jsPlumb.addEndpoint(id, { anchors: "RightMiddle" }, hollowCircle);
                        // jsPlumb.addEndpoint(id, { anchors: "BottomCenter" }, hollowCircle);
                        // jsPlumb.addEndpoint(id, { anchors: "LeftMiddle" }, hollowCircle);
                        jsPlumb.draggable(id);
                        $("#" + id).draggable({ containment: "parent" });
                        doubleclick("#" + id);
                        break;
                }
            }
        });

        $("#right").on("mouseenter", ".node", function () {
            $(this).append('<img src="assets/images/close2.png"  style="position: absolute;" />');
            if ($(this).text() === "开始" || $(this).text() === "结束") {
                $("img").css("left", 158).css("top", 0);
            } else {
                $("img").css("left", 158).css("top", -10);
            }
        });

        $("#right").on("mouseleave", ".node", function () {
            $("img").remove();
        });
        $("#right").on("click", "img", function () {
            if (confirm("确定要删除吗?")) {
                jsPlumb.removeAllEndpoints($(this).parent().attr("id"));
                $(this).parent().remove();
            }
        });

        let _time = null;
        jsPlumb.bind("dblclick", function (conn, originalEvent) {
            clearTimeout(_time);
            let str = conn.getLabel();
            if (str == null) {
                conn.setLabel("<input type='text' value=' ' />");
            } else {
                conn.setLabel("<input type='text' value='" + $(str).text() + "' />");
            }
            $("input[type='text']").mouseleave(function () {
                if ($(this).val().trim() === "") {
                    conn.setLabel("");
                } else {
                    conn.setLabel("<span style='display:block;padding:10px;opacity: 0.5;height:auto;background-color:white;border:1px solid #346789;text-align:center;font-size:12px;color:black;border-radius:0.5em;'>" + $(this).val() + "</span>");
                }
            });
        });

        // 基本连接线样式
        let connectorPaintStyle = {
            lineWidth: 4,
            strokeStyle: "#61B7CF",
            joinstyle: "round",
            outlineColor: "white",
            outlineWidth: 2
        };
        // 鼠标悬浮在连接线上的样式
        let connectorHoverStyle = {
            lineWidth: 4,
            strokeStyle: "#216477",
            outlineWidth: 2,
            outlineColor: "white"
        };
        let endpointHoverStyle = {
            fillStyle: "#216477",
            strokeStyle: "#216477"
        };
        // 空心圆端点样式设置
        let hollowCircle = {
            endpoint: ["Dot", { radius: 8 }],  // 端点的形状
            connectorStyle: connectorPaintStyle, // 连接线的颜色，大小样式
            connectorHoverStyle: connectorHoverStyle,
            paintStyle: {
                strokeStyle: "#1e8151",
                fillStyle: "transparent",
                radius: 2,
                lineWidth: 2
            },		// 端点的颜色样式
            // anchor: "AutoDefault",
            isSource: true,	// 是否可以拖动（作为连线起点）
            connector: ["Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],  // 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
            isTarget: true,	// 是否可以放置（连线终点）
            maxConnections: -1,	// 设置连接点最多可以连接几条线
            connectorOverlays: [["Arrow", { width: 10, length: 10, location: 1 }]]
        };
        // 实心圆样式
        let solidCircle = {
            endpoint: ["Dot", { radius: 8 }],  // 端点的形状
            paintStyle: { fillStyle: "rgb(122, 176, 44)" },	// 端点的颜色样式
            connectorStyle: { strokeStyle: "rgb(97, 183, 207)", lineWidth: 4 },	  // 连接线的颜色，大小样式
            isSource: true,	// 是否可以拖动（作为连线起点）
            connector: ["Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }], // 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
            isTarget: true,		// 是否可以放置（连线终点）
            // anchor: "AutoDefault",
            maxConnections: 3,	// 设置连接点最多可以连接几条线
            connectorOverlays: [["Arrow", { width: 10, length: 10, location: 1 }]]
        };

        // 连线成功之前
        // jsPlumb.bind('beforeDrop', function (conn) {
        //     if (conn.sourceId === conn.targetId) {
        //         return false
        //     } else {
        //         return true
        //     }
        // });

        jsPlumb.bind("connection", function(connInfo){
            if (connInfo.connection.sourceId === connInfo.connection.targetId) {
                jsPlumb.detach(connInfo); // 取消连接
                alert("不能连接自己！");
            } else {
                alert("连接成功");
            }
            console.log(connInfo);
        });

        // jsPlumb.bind("click", function(connInfo){
        //     console.log(connInfo);
        // });

    }

}
