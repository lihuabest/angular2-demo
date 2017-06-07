/**
 * Created by Administrator on 2017/6/6.
 */

import {AppDynamicSkyComponent} from "../module/dynamic/components/sky/dynamic.sky.component";
import {AppDynamicOceanComponent} from "../module/dynamic/components/ocean/dynamic.ocean.component";
import {Injectable} from "@angular/core";

@Injectable()
export class DynamicTypeService {
  static Types = {
    'sky': AppDynamicSkyComponent,
    'ocean': AppDynamicOceanComponent
  };

  getType(type: string): any {
    return DynamicTypeService.Types[type];
  }
}
