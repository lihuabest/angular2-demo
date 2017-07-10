/**
 * Created by LIHUA on 2017/7/7/007.
 */

import {RouterModule, Routes} from "@angular/router";
import {AppCanvasCellsComponent} from "./components/cells/canvas.cells.component";
import {NgModule} from "@angular/core";

const canvasModule: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AppCanvasCellsComponent
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
