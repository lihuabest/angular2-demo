import {NgModule} from "@angular/core";
import {HandsontableIndexComponent} from "./components/index/handsontable.index.component";
import {HandsontableRoutesModule} from "./handsontable.routes";
import {HandsontableTableComponent} from "./components/table/handsontable.table.component";

/**
 * https://github.com/handsontable/handsontable/issues/4053
 * handsontable  不能直接在angular-cli里配置 目前是直接修改cli的common
 *
 * module.exports = {
      module: {
            noParse: [path.join(__dirname, "node_modules/handsontable/dist/handsontable.full.js")]
      },
      plugins: [new webpack.ProvidePlugin({
          "Handsontable": "handsontable/dist/handsontable.full.js"
      })],
    }
 */
@NgModule({
    imports: [
        HandsontableRoutesModule
    ],
    declarations: [
        HandsontableIndexComponent,
        HandsontableTableComponent
    ],
    exports: [
        HandsontableIndexComponent
    ]
})
export class HandsontableModule {

}
