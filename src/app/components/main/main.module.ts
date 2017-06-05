import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {RouterModule} from "@angular/router";
import {MainGuard} from "./main.guard";
import {LoginService} from "../../services/login.service";
/**
 * Created by Administrator on 2017/4/13.
 */

@NgModule({
    imports: [
      RouterModule
    ],
    declarations: [
      MainComponent
    ],
    exports: [
      MainComponent
    ],
    providers: [LoginService, MainGuard]
})

export class MainModule {}
