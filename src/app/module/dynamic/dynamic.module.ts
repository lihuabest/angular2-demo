import {NgModule} from "@angular/core";
import {DynamicRoutesModule} from "./dynamic.routes";
import {AppDynamicViewComponent} from "./components/view/dynamic.view.component";
import {AppDynamicOceanComponent} from "./components/ocean/dynamic.ocean.component";
import {AppDynamicSkyComponent} from "./components/sky/dynamic.sky.component";
import {DynamicTypeService} from "../../services/dynamic.type.service";
/**
 * Created by Administrator on 2017/6/6.
 */

@NgModule({
  imports: [
    DynamicRoutesModule
  ],
  declarations: [
    AppDynamicViewComponent,
    AppDynamicOceanComponent,
    AppDynamicSkyComponent
  ],
  providers: [
    DynamicTypeService
  ],
  exports: [
    AppDynamicViewComponent,
  ],
  entryComponents: [
    AppDynamicViewComponent,
    AppDynamicOceanComponent,
    AppDynamicSkyComponent
  ]
})
export class DynamicModule {}
