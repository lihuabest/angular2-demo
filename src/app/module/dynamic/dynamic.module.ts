import {NgModule} from "@angular/core";
import {DragulaModule} from "ng2-dragula";
import {DynamicRoutesModule} from "./dynamic.routes";
import {AppDynamicViewComponent} from "./components/view/dynamic.view.component";
import {AppDynamicOceanComponent} from "./components/ocean/dynamic.ocean.component";
import {AppDynamicSkyComponent} from "./components/sky/dynamic.sky.component";
import {DynamicTypeService} from "../../services/dynamic.type.service";
import {AppDynamicDragulaComponent} from "./components/dragula/dynamic.dragula.component";
import {DynamicViewDeactivateGuard} from "./components/view/dynamic.view.deactivate.guard";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgShowDirective} from "../../directives/ng.show.directive";
import {AppDynamicTransclusionComponent} from "./components/transclusion/dynamic.transclusion.component";
/**
 * Created by Administrator on 2017/6/6.
 */

@NgModule({
    imports: [
        CommonModule,
        DynamicRoutesModule,
        DragulaModule,
        RouterModule
    ],
    declarations: [
        AppDynamicViewComponent,
        AppDynamicOceanComponent,
        AppDynamicSkyComponent,
        AppDynamicDragulaComponent,
        AppDynamicTransclusionComponent,
        NgShowDirective
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
        AppDynamicTransclusionComponent
    ]
})
export class DynamicModule {}
