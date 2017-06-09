/**
 * Created by Administrator on 2017/6/7.
 */
import {Component} from '@angular/core';
import {DragulaService} from "ng2-dragula";

@Component({
  selector: 'app-dynamic-dragula-component',
  templateUrl: './dynamic.dragula.component.html',
  styleUrls: ['./dynamic.dragula.component.scss']
})
export class AppDynamicDragulaComponent {
    public many: Array<string> = ['The', 'possibilities', 'are', 'endless!'];
    public many2: Array<string> = ['Explore', 'them'];

    constructor(private dragulaService: DragulaService) {
        dragulaService.dropModel.subscribe((value) => {
            this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe((value) => {
            this.onRemoveModel(value.slice(1));
        });

        dragulaService.drag.subscribe(value => {
            // 这个动作发生在拖拽发生的时候
            this.onDrag(value);
        });
        dragulaService.drop.subscribe(value => {
            // 这个动作发生在拖拽实际产生了和别人移位之后
            this.onDrop(value);
        });
        dragulaService.cancel.subscribe(value => {
            // 这个动作发生在拖拽实际产生了但是又回归了原位
            this.onCancel(value);
        });
        dragulaService.over.subscribe(value => {
            this.onOver(value);
        });
        dragulaService.out.subscribe(value => {
            this.onOut(value);
        });

    }

    onDropModel(args) {
        let [el, target, source] = args;
        console.log(el, target, source);
    }

    onRemoveModel(args) {
        let [el, source] = args;
        console.log(args);
    }

    onDrag(args) {
        let [e, el] = args;
        el.classList.add('ex-moved');
    }

    onDrop(args) {
        let [e, el] = args;
        el.classList.remove('ex-moved');
    }

    onCancel(args) {
        let [e, el] = args;
        el.classList.remove('ex-moved');
    }

    onOver(args) {
        let [e, el] = args;
        el.classList.add('ex-over');
    }

    onOut(args) {
        let [e, el] = args;
        el.classList.remove('ex-over');
    }
}
