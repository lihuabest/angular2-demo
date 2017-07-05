/**
 * Created by LIHUA on 2017/7/5/005.
 */

import {Component} from "@angular/core";

@Component({
    selector: 'app-dynamic-tree-component',
    templateUrl: './dynamic.tree.component.html',
    styleUrls: ['./dynamic.tree.component.scss']
})
export class AppDynamicTreeComponent {
    datas = [
        {
            name: '四川',
            expand: false,
            children: [{
                name: '成都',
                children: []
            }, {
                name: '自贡',
                expand: false,
                children: [{
                    name: '恐龙'
                }, {
                    name: '灯会'
                }]
            }]
        },
        {
            name: '重庆',
            expand: false,
            children: [{
                name: '涪陵',
                children: []
            }, {
                name: '江北',
                children: []
            }]
        }
    ];
}
