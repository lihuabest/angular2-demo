import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {HandsontableIndexComponent} from "./components/index/handsontable.index.component";

const handlesontableModule: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HandsontableIndexComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(handlesontableModule)
    ],
    exports: []
})
export class HandsontableRoutesModule {

}
