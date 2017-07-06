/**
 * Created by LIHUA on 2017/7/5/005.
 */

import {animate, state, style, transition, trigger} from "@angular/animations";

/**
 * 动画对象
 */
export class Animations {

    /**
     * slide
     * @type {AnimationTriggerMetadata}
     */
    public static slideInOut = trigger('slideInOut', [
        state('*', style({
            overflow: 'hidden'
        })),
        transition('* => void', [
            style({ height: '*' }),
            animate('0.2s ease-in', style({height: 0}))
        ]),
        transition('void => *', [
            style({ height: 0 }),
            animate('0.2s ease-out')
        ])
    ]);

    /**
     * 从右往下旋转
     * @type {AnimationTriggerMetadata}
     * transform动画有点奇怪，必须手动指定transition
     */
    public static rotateRightToDown = trigger('rotateRightToDown', [
        state('active', style({
            transform: 'rotate(90deg)',
            transition: 'transform 0.2s'
        })),
        state('*', style({
            transition: 'transform 0.2s'
        })),
        transition('void => active', [
            style({
                transform: 'rotate(0deg)'
            })
        ]),
        transition('active => void', [
            style({
                transform: 'rotate(0deg)'
            })
        ])
    ]);
}
