import {Component, ComponentFactoryResolver, ComponentRef, OnDestroy, ViewChild, ViewContainerRef} from "@angular/core";
import {DynamicTypeService} from "../../../../services/dynamic.type.service";
import {UiService} from "../../../../services/ui/ui.service";
import {AppDynamicSkyComponent} from "../sky/dynamic.sky.component";
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
        private componentFactoryResolver: ComponentFactoryResolver,
        private uiService: UiService
    ) {}

    ngOnDestroy() {
        if (this.dynamicHostRef) {
            this.dynamicHostRef.destroy();
        }
    }

    // 动态切换子组件
    setDynamic(type: string) {
        const dynamicTypeComponent = this.dynamicTypeService.getType(type);
        if (dynamicTypeComponent) {
              this.dynamicHost.clear();

              const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicTypeComponent);
              this.dynamicHostRef = this.dynamicHost.createComponent(componentFactory).instance; // 子组件引用可以直接调用子组件方法
        }
    }

    showComfirm(): Promise<boolean> {
        return new Promise((resolve, reject) => {
             this.uiService.confirm('确认离开').subscribe(val => {
                 // 这里就可以针对不同的选择操作做处理
                 setTimeout(() => {
                     resolve(val);
                 }, 100);
             });
        });
    }


    showMdDialog() {

    }

}
