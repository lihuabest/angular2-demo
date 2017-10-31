import {NgModule} from "@angular/core";
import {DragulaModule} from "ng2-dragula";
import {DynamicRoutesModule} from "./dynamic.routes";
import {AppDynamicViewComponent} from "./components/view/dynamic.view.component";
import {AppDynamicOceanComponent} from "./components/ocean/dynamic.ocean.component";
import {AppDynamicSkyComponent} from "./components/sky/dynamic.sky.component";
import {DynamicTypeService} from "../../services/dynamic.type.service";
import {AppDynamicDragulaComponent} from "./components/dragula/dynamic.dragula.component";
import {AppDynamicTreeComponent} from "./components/tree/dynamic.tree.component";
import {DynamicViewDeactivateGuard} from "./components/view/dynamic.view.deactivate.guard";

import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgShowDirective} from "../../directives/ng.show.directive";
import {AppDynamicTransclusionComponent} from "./components/transclusion/dynamic.transclusion.component";
import {AppTreeRootComponent} from "./components/tree/root/tree.root.component";
import {AppDynamicTabComponent} from "./components/tab/dynamic.tab.component";
import {FormsModule} from "@angular/forms";
/**
 * Created by Administrator on 2017/6/6.
 */

@NgModule({
    imports: [
        CommonModule,
        DynamicRoutesModule,
        DragulaModule,
        RouterModule,
        FormsModule
    ],
    declarations: [
        AppDynamicViewComponent,
        AppDynamicOceanComponent,
        AppDynamicSkyComponent,
        AppDynamicDragulaComponent,
        AppDynamicTransclusionComponent,
        AppDynamicTreeComponent,
        AppDynamicTabComponent,
        NgShowDirective,
        AppTreeRootComponent
    ],
    providers: [
        DynamicTypeService,
        DynamicViewDeactivateGuard
    ],
    exports: [
        AppDynamicViewComponent,
    ],
    entryComponents: [
        AppDynamicViewComponent,
        AppDynamicOceanComponent,
        AppDynamicSkyComponent,
        AppDynamicDragulaComponent,
        AppDynamicTransclusionComponent,
        AppDynamicTreeComponent,
        AppTreeRootComponent
    ]
})
export class DynamicModule {}
