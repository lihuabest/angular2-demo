import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {AppDialogComponent} from "../../services/dialog/dialog.component";
/**
 * Created by Administrator on 2017/4/13.
 */

@NgModule({
    imports: [
      RouterModule,
    ],
    declarations: [
        LoginComponent,
        AppDialogComponent
    ],
    exports: [LoginComponent],
    providers: [],
    entryComponents: [AppDialogComponent]
})

export class LoginModule {}
