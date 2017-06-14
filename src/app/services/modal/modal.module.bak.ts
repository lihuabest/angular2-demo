/**
 * Created by Administrator on 2017/6/13.
 */

import {
    Compiler, Component, ComponentFactoryResolver, ComponentRef, Injectable, Injector, NgModule, OnInit, ViewChild,
    ViewContainerRef
} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {Subject} from "rxjs/Subject";


@Injectable()
export class ModalService {
    private viewContainerRef: ViewContainerRef;
    private injector: Injector;
    private dataTransfer: ModalDataTransfer;

    // 动态子组件引用
    componnetInstanceRef: any;

    constructor(private compiler: Compiler,
                private componentFactoryResolver: ComponentFactoryResolver) {

    }

    registerViewContainerRef(vcRef: ViewContainerRef): void {
        this.viewContainerRef = vcRef;
    }

    registerInjector(injector: Injector): void {
        this.injector = injector;
    }

    registerDataTransfer(modalDataTransfer: ModalDataTransfer): void {
        this.dataTransfer = modalDataTransfer;
    }

    // open<T>(module: any, componnet: any, params?: Object): Observable<ComponentRef<T>> {
    open<T>(componnet: any, params?: Object): ComponentRef<T> {

        this.dataTransfer.showDialog.next(true);

        this.viewContainerRef.clear();

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componnet);
        this.componnetInstanceRef = this.viewContainerRef.createComponent(componentFactory).instance;

        this.componnetInstanceRef['destroy'] = () => {
            this.dataTransfer.showDialog.next(false);
            // this.componnetInstanceRef.destroy();
        };

        return this.componnetInstanceRef;
    }

    destroy() {
        if(this.componnetInstanceRef) {
            // this.componnetInstanceRef.destroy();
            this.dataTransfer.showDialog.next(false);
        }
    }
}

@Injectable()
export class ModalDataTransfer {

    showDialog: Subject<boolean> = new Subject<boolean>();

}

@Component({
    selector: 'app-modal-placehoder',
    template: `
        <div class="modal-container" [class.hidden]="!isShowModal">
            <div class="modal-container-overlay"></div>
            <div class="modal-container-content">
                <ng-template #modalplaceholder></ng-template>
            </div>
        </div>
    `,
    styles: [`
        .modal-container {
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
        }
        .modal-container.hidden {
            display: none;
        }
        .modal-container-overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #000;
            opacity: 0.5;
        }
        .modal-container-content {
            padding: 10px;
            background: #fff;
            width: 100px;
            height: 100px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    `]
})
export class ModalPlaceholderComponent implements OnInit {

    isShowModal: boolean = false;

    @ViewChild('modalplaceholder', {read: ViewContainerRef}) viewContainerRef;

    constructor(private modalService: ModalService,
                private injector: Injector,
                private modalDataTransfer: ModalDataTransfer) {

        this.modalDataTransfer.showDialog.subscribe(data => this.isShowModal = data);

    }

    ngOnInit(): void {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
        this.modalService.registerInjector(this.injector);
        this.modalService.registerDataTransfer(this.modalDataTransfer);
    }
}


@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [ModalPlaceholderComponent],
    exports: [ModalPlaceholderComponent],
    providers: [
        ModalService,
        ModalDataTransfer
    ]
})
export class ModalModule {

    constructor() {

    }
}


// /**
//  * Created by Administrator on 2017/6/13.
//  */
//
// import {
//     ApplicationRef,
//     Compiler, Component, ComponentFactoryResolver, ComponentRef, ElementRef, Injectable, Injector, NgModule, OnDestroy,
//     OnInit,
//     ReflectiveInjector, Renderer2, TemplateRef,
//     ViewChild,
//     ViewContainerRef, ViewRef
// } from "@angular/core";
// import {BrowserModule} from "@angular/platform-browser";
// import {Subject} from "rxjs/Subject";
//
// export class ContentRef {
//     constructor(public nodes: any[], public viewRef?: ViewRef, public componentRef?: ComponentRef<any>) {}
// }
//
// @Component({
//     selector: 'app-model-window',
//     template: `
//         <div class="modal-dialog">
//             <div class="modal-content">
//                 <ng-content></ng-content>
//             </div>
//         </div>
//     `
// })
// export class ModalWindow implements OnInit, OnDestroy {
//
//     constructor(private elementRef: ElementRef, private renderer: Renderer2) {
//
//     }
//
//     ngOnInit() {
//         this.renderer.addClass(document.body, 'modal-open');
//     }
//
//     ngOnDestroy() {
//         this.renderer.removeClass(document.body, 'modal-open');
//     }
//
// }
//
// @Injectable()
// export class ActiveModal {
//     close(result?: any): void {}
//
//     dismiss(result?: any): void {}
// }
//
// @Injectable()
// export class ModalRef {
//
// }
//
// export interface ModalOptions {
//     /**
//      * 容器
//      */
//     container?: string;
//
//     /**
//      * 是否显示背景层
//      */
//     backdrop?: boolean | 'static';
// }
//
// @Injectable()
// export class ModalService {
//     private viewContainerRef: ViewContainerRef;
//     private dataTransfer: ModalDataTransfer;
//
//     // 动态子组件引用
//     componnetInstanceRef: any;
//
//     constructor(private compiler: Compiler,
//                 private componentFactoryResolver: ComponentFactoryResolver,
//                 private applicationRef: ApplicationRef,
//                 private injector: Injector) {
//
//     }
//
//     open<T>(componnet: any, params: ModalOptions = {}): ComponentRef<T> {
//
//         const containerSelector = params.container || 'body';
//         const containerEl = document.querySelector(containerSelector);
//
//         const activeModal = new ActiveModal();
//         const contentRef = this._getContentRef(this.componentFactoryResolver, this.injector, componnet, activeModal);
//
//         let modalWindowRef: ComponentRef<ModalWindow>;
//
//
//         return this.componnetInstanceRef;
//     }
//
//     private _getContentRef(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, context: ActiveModal) {
//         if(content instanceof TemplateRef) {
//             const viewRef = content.createEmbeddedView(context);
//             this.applicationRef.attachView(viewRef);
//             return new ContentRef([viewRef.rootNodes], viewRef);
//         } else if(typeof content === 'string') {
//             return new ContentRef([[document.createTextNode(`${{content}}`)]]);
//         } else {
//             const contentCmptFactory = moduleCFR.resolveComponentFactory(content);
//             const modalContentInjector = ReflectiveInjector.resolveAndCreate([{provide: ActiveModal, useValue: context}], contentInjector);
//             const componentRef = contentCmptFactory.create(modalContentInjector);
//             this.applicationRef.attachView(componentRef.hostView);
//             return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
//         }
//     }
// }
//
// @Injectable()
// export class ModalDataTransfer {
//
//     showDialog: Subject<boolean> = new Subject<boolean>();
//
// }
//
// // @Component({
// //     selector: 'app-modal-placehoder',
// //     template: `
// //         <div class="modal-container" [class.hidden]="!isShowModal">
// //             <div class="modal-container-overlay"></div>
// //             <div class="modal-container-content">
// //                 <ng-template #modalplaceholder></ng-template>
// //             </div>
// //         </div>
// //     `,
// //     styles: [`
// //         .modal-container {
// //             position: fixed;
// //             width: 100%;
// //             height: 100%;
// //             left: 0;
// //             top: 0;
// //         }
// //         .modal-container.hidden {
// //             display: none;
// //         }
// //         .modal-container-overlay {
// //             position: absolute;
// //             width: 100%;
// //             height: 100%;
// //             background-color: #000;
// //             opacity: 0.5;
// //         }
// //         .modal-container-content {
// //             padding: 10px;
// //             background: #fff;
// //             width: 100px;
// //             height: 100px;
// //             position: absolute;
// //             left: 50%;
// //             top: 50%;
// //             transform: translate(-50%, -50%);
// //         }
// //     `]
// // })
// // export class ModalPlaceholderComponent implements OnInit {
// //
// //     isShowModal: boolean = false;
// //
// //     @ViewChild('modalplaceholder', {read: ViewContainerRef}) viewContainerRef;
// //
// //     constructor(private modalService: ModalService,
// //                 private injector: Injector,
// //                 private modalDataTransfer: ModalDataTransfer) {
// //
// //         this.modalDataTransfer.showDialog.subscribe(data => this.isShowModal = data);
// //
// //     }
// //
// //     ngOnInit(): void {
// //         this.modalService.registerViewContainerRef(this.viewContainerRef);
// //         this.modalService.registerInjector(this.injector);
// //         this.modalService.registerDataTransfer(this.modalDataTransfer);
// //     }
// // }
//
//
// // @NgModule({
// //     imports: [
// //         BrowserModule
// //     ],
// //     declarations: [ModalPlaceholderComponent],
// //     exports: [ModalPlaceholderComponent],
// //     providers: [
// //         ModalService,
// //         ModalDataTransfer
// //     ]
// // })
// // export class ModalModule {
// //
// //     constructor() {
// //
// //     }
// // }
