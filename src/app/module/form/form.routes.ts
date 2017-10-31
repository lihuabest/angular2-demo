import {RouterModule, Routes} from "@angular/router";
/**
 * Created by Administrator on 2017/5/1.
 */

import {AppFormComponent} from './components/form.component';
import {NgModule} from "@angular/core";
import {FormUploadComponent} from "./components/upload/form.upload.component";

const FormRoutes: Routes = [
  {
    path: '',
    component: AppFormComponent
  },
  {
    path: 'upload',
    component: FormUploadComponent
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
