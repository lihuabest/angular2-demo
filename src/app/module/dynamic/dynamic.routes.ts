import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AppDynamicViewComponent} from "./components/view/dynamic.view.component";
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
    component: AppDynamicViewComponent
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
