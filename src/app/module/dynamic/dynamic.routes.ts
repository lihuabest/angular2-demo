import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AppDynamicViewComponent} from "./components/view/dynamic.view.component";
import {AppDynamicDragulaComponent} from "./components/dragula/dynamic.dragula.component";
import {DynamicViewDeactivateGuard} from "./components/view/dynamic.view.deactivate.guard";
/**
 * Created by Administrator on 2017/6/6.
 */

const DynamicRoutes: Routes = [
    {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full'
    },
    {
        path: 'view',
        component: AppDynamicViewComponent,
        // 路由可否被撤销
        canDeactivate: [DynamicViewDeactivateGuard]
    },
    {
        path: 'drag',
        component: AppDynamicDragulaComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(DynamicRoutes)
    ],
    exports: [

    ]
})
export class DynamicRoutesModule {}
