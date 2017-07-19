/**
 * Created by LIHUA on 2017/7/19/019.
 */

import {AfterViewInit, Component, Input} from "@angular/core";
import * as d3 from 'd3';

export interface D3PipeConfigInterface {
    data?: Array<number>,
    radius?: number;
    background?: string;
    stroke?: Array<string>;
    strokeWidth?: number
}

@Component({
    selector: 'app-canvas-d3-pipe-component',
    template: '<div id="d3-pipe-container"></div>',
    styles: [`
        #d3-pipe-container {
            margin-top: 30px;
        }
    `]
})
export class AppCanvasD3PipeComponent implements AfterViewInit {

    @Input()
    option?: D3PipeConfigInterface; // #F3812B  #D9D9D9

    defaultOption: D3PipeConfigInterface;

    constructor () {
        this.defaultOption = {
            data: [0.6],
            radius: 100,
            background: '#D9D9D9',
            stroke: ['#F3812B'],
            strokeWidth: 10
        } as D3PipeConfigInterface;
    }

    ngAfterViewInit () {
        this.option = this.option || {};
        this.option = Object.assign(this.option, this.defaultOption);

        const svg = d3.select('#d3-pipe-container')
            .selectAll('svg')
            .data([1])
            .enter()
            .append('svg')
            .attr('width', this.option.radius * 2)
            .attr('height', this.option.radius * 2);

        svg.append('circle')
            .attr('cx', this.option.radius)
            .attr('cy', this.option.radius)
            .attr('r', this.option.radius)
            .attr('fill', this.option.background);

        svg.append('circle')
            .attr('cx', this.option.radius)
            .attr('cy', this.option.radius)
            .attr('r', this.option.radius - this.option.strokeWidth)
            .attr('fill', (v, i) => this.option.stroke[i]);

    }
}
