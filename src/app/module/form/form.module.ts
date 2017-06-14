/**
 * Created by Administrator on 2017/4/13.
 */

import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {AppFormComponent} from "./components/form.component";
import {FormRoutesModule} from "./form.routes";
import {ButtonModule} from "primeng/primeng";

@NgModule({
    imports: [
        FormsModule,
        FormRoutesModule,
        ButtonModule
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
