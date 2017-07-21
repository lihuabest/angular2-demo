/**
 * Created by LIHUA on 2017/7/21/021.
 */

import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import * as d3 from 'd3';

@Component({
    selector: 'app-canvas-d3-bar-group-component',
    template: `<div class="container">
                    <h2>Bar Group</h2>
                </div>`,
    styles: [`
        .container {
            margin-top: 30px;
            padding: 20px;
            border: 1px solid #EEE;
        }
        h2 {
            margin-bottom: 10px;
        }
    `]
})
export class AppCanvasD3BarGroupComponent implements OnInit {

    elem: any;

    constructor (private viewContainerRef: ViewContainerRef) { }

    ngOnInit () {
        // https://bl.ocks.org/mbostock/3887051

        this.elem = this.viewContainerRef.element.nativeElement;
        // d3.select(this.elem).select("div").style("background-color", "yellow");

        let svgWidth = 900,
            svgHeight = 500,
            margin = {top: 40, right: 20, bottom: 30, left: 40},
            width = svgWidth - margin.left - margin.right,
            height = svgHeight - margin.top - margin.bottom;


        let g = d3.select(this.elem.querySelector('.container'))
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .append('g')
            .attr('width', width)
            .attr('height', height)
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // 定义x轴的间隔
        let x0 = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1);

        // 定义x轴组内间隔
        let x1 = d3.scaleBand()
            .padding(0.05);

        let y = d3.scaleLinear()
            .rangeRound([height, 0]);

        let z = d3.scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        d3.csv('./assets/data.bar.group.tsv', d => {
            let temp = {};
            Object.keys(d).forEach(t => {
                temp[t] = Number(d[t]) ? Number(d[t]) : d[t];
            });
            return temp;
        }, (error, data) => {
            if (error) {
                throw error;
            }
            // console.log(data);
            let keys = data.columns.slice(1);

            x0.domain(data.map(d => d['State']));
            x1.domain(keys).rangeRound([0, x0.bandwidth()]);
            y.domain([0, d3.max(data, d => {
                // 这里语法上加上 return
                return d3.max(keys, key => {
                    return d[key];
                });
            })]);

            g.append('g')
                .selectAll('g')
                .data(data)
                    .enter()
                    .append('g')
                    .attr('transform', d => {return 'translate(' + x0(d['State']) + ')'})
                .selectAll('rect')
                .data( d => {
                    return keys.map( key => {
                        return {
                            key: key,
                            value: d[key]
                        }}
                    )}
                )
                    .enter()
                    .append('rect')
                    .attr('x', d => { return x1(d.key)})
                    .attr('y', d => { return y(d.value)})
                    .attr('width', x1.bandwidth())
                    .attr('height', d => {return height - y(d.value)})
                    .attr('fill', (d, i) => {return '' + z(i + '')});

            // x轴
            g.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(0, ' + height + ')')
                .call(d3.axisBottom(x0))
                .selectAll('path')
                .style('display', 'none');

            // y 轴
            let gg = g.append('g')
                .call(d3.axisLeft(y).ticks(null, 's'));
            gg.append('text')
                .attr('x', 20)
                .attr('y', 0.5)
                .attr('dy', '0.32em')
                .attr('fill', '#000')
                .attr('font-weight', 'bold')
                .attr('font-anchor', 'start')
                .text('Population');
            gg.selectAll('path')
                .style('display', 'none');

            let legend = g.append('g')
                .attr('font-family', 'sans-serif')
                .attr('font-size', 10)
                .attr('text-anchor', 'end')
                .attr('transform', 'translate(120, -50)')
                .selectAll('g')
                .data(keys.slice().reverse())
                .enter()
                    .append('g')
                    // .attr('width', 100)
                    .attr('height', 20)
                    .attr('transform', (d, i) => `translate(${i * 100 + 40}, 10)`);


            legend.append('text')
                .attr('y', 13)
                .attr('x', -5)
                .text(d => d);

            legend.append('rect')
                .attr('width', 19)
                .attr('height', 19)
                .attr('rx', 4)
                .attr('ry', 4)
                .style('fill', (d, i) => {return '' + z(i + '')});

            console.log(legend)
        });
    }


}
