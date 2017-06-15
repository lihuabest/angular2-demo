/**
 * Created by Administrator on 2017/6/13.
 */

import {
    ApplicationRef, Component, ComponentFactoryResolver, Injectable, NgModule,
    OnInit,
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import {animate, state, style, trigger, transition} from "@angular/animations";
import {CommonModule} from "@angular/common";

export interface ModalOptions {
    /**
     * 容器
     */
    container?: string;

    /**
     * 是否显示背景层
     */
    backdrop?: boolean | 'static';
}

@Injectable()
export class ModalService {

    private contentRef;             // 模态组件在根组件里的引用
    private contentComponent;       // 模态组件
    private contentInstance;　　　   // 模态组件实例

    private modalComponentRef; 　　  // 根组件引用
    private modalComponentInstance; // 根组件实例引用

    constructor(private _applicationRef: ApplicationRef,
                private _componentFactoryResolver: ComponentFactoryResolver) {}

    open(content: any, options: ModalOptions = {}) {

        // 初始化根组件
        this.initModalComponentInstance();

        // 初始化内容组件
        this.initContentInstance(content);

        return this.contentInstance;
    }

    // 初始化根组件实例
    initModalComponentInstance() {
        // 初始化根组件
        let modalComponentFactory = this._componentFactoryResolver.resolveComponentFactory(ModalComponent);
        // 插入根组件的dom
        document.body.insertBefore(document.createElement(modalComponentFactory.selector), document.body.firstChild);

        // 最重要的这里 把组件插入到根应用
        this.modalComponentRef = this._applicationRef.bootstrap(modalComponentFactory);
        // 获取实例
        this.modalComponentInstance = this.modalComponentRef.instance;

        this.modalComponentInstance.isShow = true;
        this.contentRef = this.modalComponentInstance.contentRef;
    }

    // 动态初始化模态组件
    initContentInstance(content: any) {

        const contentFactory = this._componentFactoryResolver.resolveComponentFactory(content);
        this.contentComponent = this.contentRef.createComponent(contentFactory);
        this.contentInstance = this.contentComponent.instance;

        // 绑定一个destroy给外部调用 删除模态组件
        this.contentInstance['destroy'] = () => {
            this.modalComponentInstance.isShow = false;

            setTimeout(() => {
                this.contentComponent.destroy();
                this.modalComponentRef.destroy();

                this.clear();
            }, 200);
        };
    }

    // 清除各种引用
    private clear() {
        this.contentRef = null;
        this.contentComponent = null;
        this.contentInstance = null;
        this.modalComponentInstance = null;
        this.modalComponentRef = null;
    }
}

@Component({
    selector: 'app-modal-component',
    template: `
        <div class="app-modal-container" [@fadeInOut] *ngIf="isShow">
            <div class="app-modal-overlay"></div>
            <div class="app-modal-content">
                <ng-template #content></ng-template>
            </div>
        </div>
    `,
    styles: [`
        .app-modal-container {
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0;
            top: 0;
        }
        .app-modal-overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #000;
            opacity: 0.5;
        }
        .app-modal-content {
            min-width: 100px;
            min-height: 100px;
            padding: 15px;
            background: #fff;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    `],
    animations: [
        trigger('fadeInOut', [
            state('in', style({opacity: '0.5'})),
            transition('void => *', [
                style({opacity: '0.5'}),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({opacity: '0'}))
            ])
        ])
    ]
})
export class ModalComponent {

    // 控制动画显示 目前没调试好
    isShow: boolean = true;

    @ViewChild('content', {read: ViewContainerRef}) contentRef;

    constructor() {

    }

}

@NgModule({
    imports: [CommonModule],
    declarations: [ModalComponent],
    providers: [ModalService],
    entryComponents: [ModalComponent]
})
export class ModalModule {}
