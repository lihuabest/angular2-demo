import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {RouterModule} from "@angular/router";
import {DragulaModule} from "ng2-dragula";
import {BrowserModule} from "@angular/platform-browser";
/**
 * Created by Administrator on 2017/4/13.
 */

@NgModule({
    imports: [
      BrowserModule,
      RouterModule,
      DragulaModule
    ],
    declarations: [LoginComponent],
    exports: [LoginComponent],
    providers: []
})

export class LoginModule {}
