import {Component, OnDestroy} from "@angular/core";
import {DataTransferService} from "../../../../services/data.transfer.service";
/**
 * Created by Administrator on 2017/6/6.
 */

@Component({
  selector: 'app-dynamic-sky-component',
  templateUrl: './dynamic.sky.component.html',
  styleUrls: ['./dynamic.sky.component.scss']
})
export class AppDynamicSkyComponent implements OnDestroy {
    number = 0;
    input: string;

    unsubscribes = [];

    constructor(private dataTransferService: DataTransferService) {

        let updateNumberSubject = this.dataTransferService.updateNumberSubject.subscribe(data => {
            this.number = data;
        });
        this.unsubscribes.push(updateNumberSubject);
    }

    ngOnDestroy() {
        this.unsubscribes.forEach(u => u.unsubscribe());
    }

    submitClick() {
        this.dataTransferService.updateNumber(this.number + Number(this.input));
    }
}
