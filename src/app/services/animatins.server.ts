/**
 * Created by LIHUA on 2017/7/5/005.
 */

import {animate, state, style, transition, trigger} from "@angular/animations";

export class Animations {
    public static slideInOut = trigger('slideInOut', [
        transition('* => void', [
            style({
                height: '*'
            }),
            animate('0.2s ease-in', style({height: 0}))
        ]),
        transition('void => *', [
            style({
                height: 0
            }),
            animate('0.2s ease-out')
        ])
    ]);
}
