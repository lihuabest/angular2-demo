/**
 * Created by LIHUA on 2017/6/6.
 */

import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AppDynamicViewComponent} from "./components/view/dynamic.view.component";
import {AppDynamicDragulaComponent} from "./components/dragula/dynamic.dragula.component";
import {AppDynamicTreeComponent} from "./components/tree/dynamic.tree.component";
import {DynamicViewDeactivateGuard} from "./components/view/dynamic.view.deactivate.guard";

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
    },
    {
        path: 'tree',
        component: AppDynamicTreeComponent
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
