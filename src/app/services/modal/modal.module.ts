import {Compiler, Component, Injector, NgModule, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
/**
 * Created by Administrator on 2017/6/13.
 */

export class ModalService {
    private vcRef: ViewContainerRef;
    private injector: Injector;
    public activeInstances: number = 0;

    constructor() {

    }

    registerViewContainerRef(vcRef: ViewContainerRef): void {
        this.vcRef = vcRef;
    }

    registerInjector(injector: Injector): void {
        this.injector = injector;
    }
}

@Component({
    selector: 'app-modal-placehoder',
    template: '<div #modalplaceholder></div>'
})
export class ModalPlaceholderComponent implements OnInit {
    @ViewChild('modalplaceholder', {read: ViewContainerRef}) viewContainerRef;

    constructor(private modalService: ModalService,
                private injector: Injector) {

    }

    ngOnInit(): void {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
        this.modalService.registerInjector(this.injector);
    }
}


@NgModule({
    declarations: [ModalPlaceholderComponent],
    exports: [ModalPlaceholderComponent],
    providers: [ModalService]
})
export class ModalModule {

    constructor() {
        let div = document.createElement('div');
        div.classList.add('modal-container');
        div.innerHTML = '<app-modal-placehoder></app-modal-placehoder>';
        document.body.appendChild(div);
    }
}
