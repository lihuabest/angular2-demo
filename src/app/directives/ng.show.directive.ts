import {Directive, EmbeddedViewRef, Input, Renderer2, TemplateRef, ViewContainerRef} from "@angular/core";
/**
 * Created by Administrator on 2017/6/21.
 */

/**
 * 自定义结构型指令
 */
@Directive({selector: '[ngShow]'})
export class NgShowDirective {

    private view: EmbeddedViewRef<any>;

    constructor(
        private templateref: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private render: Renderer2
    ) {}

    @Input() set ngShow(condition: boolean) {
        if(!this.view) {
            this.view = this.viewContainer.createEmbeddedView(this.templateref);
        }

        if(condition) {
            this.render.setStyle(this.view.rootNodes[0], 'display', 'block');
        } else if(!condition) {
            this.render.setStyle(this.view.rootNodes[0], 'display', 'none');
        }
    }
}
