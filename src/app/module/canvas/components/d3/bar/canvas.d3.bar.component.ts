/**
 * Created by LIHUA on 2017/7/19/019.
 */

import {AfterViewInit, Component} from "@angular/core";
import * as d3 from 'd3';

@Component({
    selector: 'app-canvas-d3-bar-component',
    template: '<div id="d3-bar-container"></div>',
    styles: [`
        #d3-bar-container {
            margin-top: 30px;
            border: 1px solid #EEEEEE;
        }
    `]
})
export class AppCanvasD3BarComponent implements AfterViewInit {
    // https://bl.ocks.org/mbostock/3885304
    ngAfterViewInit () {
        let svgWidth = 960,
            svgHeight = 500,
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = svgWidth - margin.left - margin.right,
            height = svgHeight - margin.top - margin.bottom;

        let svg = d3.select('#d3-bar-container')
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight );

        let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
            y = d3.scaleLinear().rangeRound([height, 0]);

        let g = svg.append('g')
            // .attr('tansform', `translate(${margin.left},${margin.top})`); // 这里语法运行没用
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        d3.tsv('./assets/data.bar.tsv', function (d) {
            return {
                letter: d.letter,
                frequency: Number(d.frequency)
            };
        }, (error, data) => {
            if (error) {
                throw error;
            }

            x.domain(data.map(d => d.letter));
            y.domain([0, d3.max(data, d => d.frequency)]);

            g.append('g')
                .attr('class', 'axis axis--x')
                .attr('transform', `translate(0, ${ height })`)
                .call(d3.axisBottom(x));

            g.append('g')
                .attr('class', 'axis axis--y')
                .call(d3.axisLeft(y).ticks(10, '%'));
            // .append('text')
            //     .attr('transform', 'rotate(-90)')
            //     .attr('y', 6)
            //     .attr('dy', '0.71em')
            //     .attr('text-anchor', 'red')
            //     .text('Frequency');

            g.selectAll('.bar-1')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar-1')
                .attr('x', (d, i) => i * (x.bandwidth() + 3) + 10)
                .attr('y', d => y(d.frequency))
                .attr('width', x.bandwidth())
                .attr('height', d => height - y(d.frequency));

        });

    }
}
