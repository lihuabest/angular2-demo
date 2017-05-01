import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {RouterModule} from "@angular/router";
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
    providers: []
})

export class MainModule {}
