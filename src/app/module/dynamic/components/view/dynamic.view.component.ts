import {Component, ComponentFactoryResolver, ComponentRef, OnDestroy, ViewChild, ViewContainerRef} from "@angular/core";
import {DynamicTypeService} from "../../../../services/dynamic.type.service";
/**
 * Created by Administrator on 2017/6/6.
 */

@Component({
  selector: 'app-dynamic-view-component',
  templateUrl: './dynamic.view.component.html',
  styleUrls: ['./dynamic.view.component.scss']
})
export class AppDynamicViewComponent implements OnDestroy {

  // 动态子组件引用
  dynamicHostRef: any;

  // 动态子组件元素引用
  @ViewChild('dynamicHost', {read: ViewContainerRef}) dynamicHost: ViewContainerRef;

  constructor(
    private dynamicTypeService: DynamicTypeService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnDestroy() {
    this.dynamicHostRef && this.dynamicHostRef.destroy();
  }

  // 动态切换子组件
  setDynamic(type: string) {
    const dynamicTypeComponent = this.dynamicTypeService.getType(type);
    if(dynamicTypeComponent) {
      this.dynamicHost.clear();

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicTypeComponent);
      this.dynamicHostRef = this.dynamicHost.createComponent(componentFactory).instance; // 子组件引用可以直接调用子组件方法
    }
  }
}
