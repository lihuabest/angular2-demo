/**
 * Created by Administrator on 2017/6/6.
 */

import {
    AfterViewInit, Component, ComponentFactoryResolver, OnDestroy, QueryList, ViewChild, ViewChildren,
    ViewContainerRef
} from "@angular/core";
import {DynamicTypeService} from "../../../../services/dynamic.type.service";
import {UiService} from "../../../../services/ui/ui.service";
import {ModalOptions, ModalService} from "../../../../services/modal/modal.module";
import {AppDialogComponent} from "../../../../services/dialog/dialog.component";
// import {MdDialog} from "@angular/material";
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';


@Component({
    selector: 'app-dynamic-view-component',
    templateUrl: './dynamic.view.component.html',
    styleUrls: ['./dynamic.view.component.scss'],
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateX(0)'})),
            transition('void => *', [
                style({transform: 'translateX(-100%)'}),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({transform: 'translateX(100%)'}))
            ])
        ])
    ]
})
export class AppDynamicViewComponent implements OnDestroy {

    // 动态子组件引用
    dynamicHostRef: any;

    // 动态子组件元素引用
    @ViewChild('dynamicHost', {read: ViewContainerRef}) dynamicHost: ViewContainerRef;

    isShowAnimate: boolean = true;

    isShowDirective: boolean = true;

    dynamicComponents = [];
    @ViewChildren('div', {read: ViewContainerRef}) divs: QueryList<ViewContainerRef>;

    constructor(
        private dynamicTypeService: DynamicTypeService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private uiService: UiService,
        // private mdDialog: MdDialog,
        private modalService: ModalService
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

    // show confirm
    showConfirm(): Promise<boolean> {
        return new Promise((resolve, reject) => {
             this.uiService.confirm('确认离开').subscribe(val => {
                 // 这里就可以针对不同的选择操作做处理
                 setTimeout(() => {
                     resolve(true);
                 }, 100);
             });
        });
    }

    // Angular Material Dialog
    showMdDialog($event: any) {
        // let ref = this.mdDialog.open(AppDialogComponent);
        // let ins = ref.componentInstance;
        //
        // ins.modalClick = () => {
        //     console.log('md model click');
        //     ref.close();
        // };
    }

    // Customer Dialog
    showCustomerDialog($event: any) {

        let ref = this.modalService.open(AppDialogComponent, {
            // backdrop: 'static',
            containerClass: 'hahah',
            overlayClass: 'xixix',
            contentClass: 'heheh'
        } as ModalOptions);

        ref.modalClick = () => {
            console.log('customer model click');
            ref.destroy();
        };

        $event.preventDefault();
    }

    /**
     * add component click
     */
    addComponentClick(type: string) {
        let component = {
            type: type,
            instance: null,
            host: null,
            checked: true
        };

        this.dynamicComponents.push(component);

        setTimeout(() => {
            let last = this.divs.last;
            const dynamicTypeComponent = this.dynamicTypeService.getType(type);
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicTypeComponent);
            this.dynamicComponents[this.divs.length - 1].instance = last.createComponent(componentFactory).instance; // 子组件引用可以直接调用子组件方法
            this.dynamicComponents[this.divs.length - 1].host = last;

            this.toggleShowDynamicComponent(component);
        });
    }

    /**
     * toggle show component
     */
    toggleShowDynamicComponent(component: any, index?: number) {
        this.dynamicComponents.forEach(c => {
            c.checked = false;
        });
        component.checked = true;
    }

    /**
     * remove component
     */
    removeDynamicComponent(component: any, index?: number) {
        component.host.clear();
        this.dynamicComponents.splice(index, 1);
    }

}
