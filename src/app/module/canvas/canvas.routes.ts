/**
 * Created by LIHUA on 2017/7/7/007.
 */

import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {AppCanvasCellsComponent} from "./components/cells/canvas.cells.component";
import {AppCanvasJsplumbComponent} from "./components/jsplumb/canvas.jsplumb.component";

const canvasModule: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AppCanvasCellsComponent
    }, {
        path: 'jsplumb',
        pathMatch: 'full',
        component: AppCanvasJsplumbComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(canvasModule)
    ],
    exports: []
})
export class CanvasRoutesModule {

}
