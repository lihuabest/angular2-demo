import {RouterModule, Routes} from "@angular/router";
/**
 * Created by Administrator on 2017/5/1.
 */

import {AppFormComponent} from './components/form.component';
import {NgModule} from "@angular/core";

const FormRoutes: Routes = [
  {
    path: '',
    component: AppFormComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(FormRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FormRoutesModule {}
