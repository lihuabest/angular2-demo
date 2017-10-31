/**
 * Created by Administrator on 2017/4/13.
 */

import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {AppFormComponent} from "./components/form.component";
import {FormRoutesModule} from "./form.routes";
import {ButtonModule} from "primeng/primeng";
import {FormUploadComponent} from "./components/upload/form.upload.component";
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
    imports: [
        FormsModule,
        FormRoutesModule,
        ButtonModule,
        FileUploadModule
    ],
    declarations: [
        AppFormComponent,
        FormUploadComponent
    ],
    providers: [

    ],
    exports: [
        AppFormComponent
    ]
})

export class FormModule {}
