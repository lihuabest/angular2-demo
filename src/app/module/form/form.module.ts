/**
 * Created by Administrator on 2017/4/13.
 */

import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {AppFormComponent} from "./components/form.component";
import {FormRoutesModule} from "./form.routes";

@NgModule({
  imports: [
    FormsModule,
    FormRoutesModule
  ],
  declarations: [
    AppFormComponent
  ],
  providers: [

  ],
  exports: [
    AppFormComponent
  ]
})

export class FormModule {}
