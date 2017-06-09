/**
 * Created by Administrator on 2017/6/9.
 */

import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {AppDynamicViewComponent} from "./dynamic.view.component";

export class DynamicViewDeactivateGuard implements CanDeactivate<AppDynamicViewComponent> {
    async canDeactivate (
        component: AppDynamicViewComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        return await component.showComfirm();
    }
}
