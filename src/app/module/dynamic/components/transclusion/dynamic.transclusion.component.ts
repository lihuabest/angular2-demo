import {Component} from "@angular/core";
/**
 * Created by Administrator on 2017/6/21.
 */

@Component({
    selector: 'app-dynamic-transclusion-component',
    template: `
        <ng-content></ng-content>
        <!-- The method to select the content is a simple CSS selector 可以是className或者nodeName-->
        <ng-content select=".header"></ng-content> 
        <div>im in transclusion</div>
    `
})
export class AppDynamicTransclusionComponent {

}
