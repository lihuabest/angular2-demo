/**
 * Created by LIHUA on 2017/7/19/019.
 */

import {AfterViewInit, Component} from "@angular/core";
import * as d3 from 'd3';

@Component({
    selector: 'app-canvas-d3-pipe-component',
    template: `<div id="d3-pipe-container"></div>`,
    styles: [`
        #d3-pipe-container {
            margin-top: 30px;
        }
    `]
})
export class AppCanvasD3PipeComponent implements AfterViewInit {

    width: number = 960;
    height: number = 500;

    ngAfterViewInit () {
        let width = this.width,
            height = this.height,
            radius = Math.min(width, height) / 2;

        let color = d3.scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        let path = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - 100);

        let pie = d3.pie()
            .sort(null)
            .value(d => {
                return d['population']
            });

        let svg = d3.select('#d3-pipe-container')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        d3.csv('./assets/data.pipe.tsv', d => {
            return {
                age: d.age,
                population: Number(d.population)
            }
        }, (error, data) => {
            if (error) {
                throw error;
            }

            let g = svg.selectAll('.arc')
                .data(pie(<any>data))
                .enter()
                .append('g')
                .attr('class', 'arc');

            g.append('path')
                .attr('d', <any>path)
                .style('fill', (d, i) => '' + color(i + ''));

            g.append('text')
                // 这里的return 必须要写 不然语法检测不通过
                .attr('transform', d => { return 'translate(' + path.centroid(<any>d) + ')' })
                .attr('dy', '.35em')
                .text(d => { return  d.data['age'] });
        });
    }
}
