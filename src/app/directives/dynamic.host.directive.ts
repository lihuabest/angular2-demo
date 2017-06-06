import {Directive, ViewContainerRef} from "@angular/core";
/**
 * Created by Administrator on 2017/6/6.
 */

@Directive({
  selector: '[dynamic-host]'
})
export class DynamicHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
