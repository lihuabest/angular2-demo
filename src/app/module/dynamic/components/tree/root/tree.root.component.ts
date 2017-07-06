/**
 * Created by LIHUA on 2017/7/5/005.
 */

import {Component, Input, OnInit} from "@angular/core";
import {Animations} from "../../../../../services/animatins.server";

@Component({
    selector: 'app-tree-root-component',
    template: `
        <div [class.tree-child]="isChild"
             [class.tree-root]="!isChild"
             *ngFor="let data of datas;let i=index;">
            
            <div (click)="expandClick(data)">
                <i class="fa fa-chevron-right" 
                   aria-hidden="true"
                   *ngIf="data.children&&data.children.length"
                   [@rotateRightToDown]="(data.children&&data.children.length&&data.expand)?'active':''"
                ></i>
                <span>{{ data.name }}</span>
            </div>
            
            <!--动画效果只能作用到规定的dom结构上-->
            <div *ngIf="data.children&&data.children.length&&data.expand"
                 [@slideInOut]="data.children&&data.children.length&&data.expand">
                <app-tree-root-component
                    [datas]="data.children"
                    [isChild]="true">
                </app-tree-root-component>
            </div>
            
        </div>
    `,
    styles: [
        `    
            .tree-root {
                width: 180px;
            }
            .tree-child {
                margin-left: 20px;
                background: #555858;
            }
        `
    ],
    // 整个动画效果单独定义 并需要具备通用性
    animations: [Animations.slideInOut, Animations.rotateRightToDown]
})
export class AppTreeRootComponent implements OnInit {

    @Input()
    datas: Array<any>;

    @Input()
    isChild: boolean;

    ngOnInit() {
        console.log(this.datas);
    }

    expandClick(data) {
        data.expand = !data.expand;
    }
}
