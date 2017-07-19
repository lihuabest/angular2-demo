/**
 * Created by LIHUA on 2017/7/19/019.
 */

import {AfterViewInit, Component, ViewChild} from "@angular/core";
import * as d3 from 'd3';

@Component({
    selector: 'app-canvas-d3-component',
    templateUrl: './canvas.d3.component.html',
    styleUrls: ['./canvas.d3.component.scss']
})
export class AppCanvasD3Component implements AfterViewInit {
    @ViewChild('container') containerRef;

    constructor () {

    }

    ngAfterViewInit () {
        d3.select('#d3-container').append('h2').text('hello d3');

        // const dataset = [23, 10, 25, 56];

        // 动态随机数
        const dataset = d3.range(10).map(() => Math.round(Math.random() * 30));

        // 柱状图
        d3.select('#d3-container')
            .append('div')
            .style('margin-top', '30px')
            .selectAll('div')
            .data(dataset)
            .enter()
            .append('div')
            .attr('class', 'bar')
            .style('height', d => (d * 3) + 'px');

        // svg 矩形
        d3.select('#d3-container')
            .append('div')
            .style('margin-top', '30px')

            .selectAll('svg')
            .data([1])
            .enter()
            .append('svg')
            .attr('width', 500)
            .attr('height', 30)

            .selectAll('rect')
            .data([1])
            .enter()
            .append('rect')
            .attr('width', 30)
            .attr('height', 30)
            .attr('x', 0)
            .attr('y', 0)
            .attr('fill', 'green');

        // svg的条形图
        const padding = 5;
        const width = 20;
        const maxHeight = 200;

        const svg = d3.select('#d3-container')
            .append('div')
            .style('margin-top', '30px')

            .selectAll('svg')
            .data([1])
            .enter()
            .append('svg')
            .attr('width', 500)
            .attr('height', maxHeight);

        console.log(dataset);
        const yScale = d3.scaleLinear().range([0, 150]).domain([0, d3.max(dataset)]);
        const yAxis = d3.axisLeft(yScale);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(25, 20)")
            .call(yAxis);

        svg.selectAll('rect')
            .data(dataset)
            .enter()
            .append('rect')
            .attr('width', width)
            // .attr('height', v => v * 3)
            .attr('height', yScale)
            // .attr('y', v => maxHeight - v * 3)
            .attr('y', v => 20)
            .attr('x', (v, i) => i * (width + padding) + 30)
            .attr('fill', v => 'rgb(0, 0, ' + (v * 10) + ')');

        svg.selectAll('text')
            .data(dataset)
            .enter()
            .append('text')
            .text(t => t)
            .attr('width', width)
            .attr('height', 30)
            .attr('y', v => maxHeight - v * 3)
            .attr('x', (v, i) => i * (width + padding))
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "red");


    }
}
