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
     * 给content容器增加class
     */
    contentClass?: string;

    overlayClass?: string;

    /**
     * 给container容器增加class
     */
    containerClass?: string;

    /**
     * 是否显示背景层
     * true 或者 null 显示背景，并点击背景消失
     * false 不显示背景
     * static 显示背景 但是点击背景不消失
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
        this.initModalComponentInstance(options);

        // 初始化内容组件
        this.initContentInstance(content);

        return this.contentInstance;
    }

    /**
     * 初始化根组件实例
     */
    initModalComponentInstance(options: ModalOptions) {
        // 初始化根组件
        let modalComponentFactory = this._componentFactoryResolver.resolveComponentFactory(ModalComponent);
        // 插入根组件的dom
        document.body.insertBefore(document.createElement(modalComponentFactory.selector), document.body.firstChild);

        // 最重要的这里 把组件插入到根应用
        this.modalComponentRef = this._applicationRef.bootstrap(modalComponentFactory);
        // 获取实例
        this.modalComponentInstance = this.modalComponentRef.instance;
        // 赋值操作
        Object.assign(this.modalComponentInstance, options);
        // 给背景层增加点击事件
        this.modalComponentInstance.overlayClick = () => {
            options.backdrop !== false && options.backdrop !== 'static' && this.destroy();
        };

        // 动态组件引用
        this.contentRef = this.modalComponentInstance.contentRef;
    }

    /**
     * 动态初始化模态组件
     * @param content 动态组件
     */
    initContentInstance(content: any) {

        const contentFactory = this._componentFactoryResolver.resolveComponentFactory(content);
        this.contentComponent = this.contentRef.createComponent(contentFactory);
        this.contentInstance = this.contentComponent.instance;

        // 绑定一个destroy给外部调用 删除模态组件
        this.contentInstance['destroy'] = () => {
            this.destroy();
        };
    }

    /**
     * 销毁
     */
    destroy() {
        this.modalComponentInstance.isShow = false;

        setTimeout(() => {
            this.contentComponent.destroy();
            this.modalComponentRef.destroy();

            this.clear();
        }, 200);
    }

    /**
     * 清除各种引用
     */
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
        <div class="app-modal-container {{ containerClass }}" [@fadeInOut] *ngIf="isShow">
            <div class="app-modal-overlay {{ overlayClass }}" (click)="overlayClick()" *ngIf="backdrop!==false"></div>
            <div class="app-modal-content {{ contentClass }}">
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
            opacity: 0.3;
        }
        .app-modal-content {
            padding: 15px;
            background: #fff;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 2px;
            overflow: auto;
            box-shadow: 0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12);
        }
    `],
    animations: [
        trigger('fadeInOut', [
            transition('void => *', [
                style({opacity: '0.3'}),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({opacity: '0'}))
            ])
        ])
    ]
})
export class ModalComponent {

    // 控制动画显示
    isShow: boolean = true;

    // 是否显示背景 及 背景点击
    backdrop: boolean | 'static';

    // 额外传递的content class
    contentClass: string;
    // 额外传递的overlay class
    overlayClass: string;
    // 额外传递的container class
    containerClass: string;

    overlayClick: Function;

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
