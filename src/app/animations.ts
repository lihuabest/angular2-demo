/**
 * Created by LIHUA on 2017/8/20.
 */

import { AnimationEntryMetadata, state } from '@angular/core';
import { trigger, transition, animate, style, query, group } from '\@angular/animations';

export const routeAnimation =
    // trigger('routeAnimation', [
    //     transition(':enter', [
    //         style({
    //             // position: 'absolute',
    //             opacity: 0
    //         }),
    //         animate('0.5s ease-in-out')
    //     ]),
    //     transition('* => *', [
    //         // query(':leave', style({ transform: 'translateX(0)', position: 'absolute'}), { optional: true }),
    //         // query(':enter', style({ transform: 'translateX(100%)', position: 'absolute'}), { optional: true }),
    //         //
    //         // group([
    //         //     query(':leave', animate('.5s ease-in-out', style({transform: 'translateX(-100%)'})), { optional: true }),
    //         //     query(':enter', animate('.5s ease-in-out', style({transform: 'translateX(0)'})), { optional: true })
    //         // ])
    //         query(':leave', style({ opacity: 1}), { optional: true }),
    //         query(':enter', style({ opacity: 0}), { optional: true }),
    //
    //         group([
    //             query(':leave', animate('.5s ease-in-out', style({opacity: 0})), { optional: true }),
    //             query(':enter', animate('.5s ease-in-out', style({opacity: 1})), { optional: true })
    //         ])
    //     ])
    // ]);

    // trigger('routeAnimation', [
    //     transition('* => *', [
    //         // make sure the new page is hidden first
    //         query(':enter', style({ opacity: 1 }), { optional: true }),
    //         // animate the leave page away
    //         query(':leave', [
    //             animate('0.5s', style({ opacity: 0 }), ),
    //             style({ display: 'none' })
    //         ], { optional: true }),
    //         // and now reveal the enter
    //         query(':enter', animate('0.5s', style({ opacity: 1 })), { optional: true })
    //     ])
    // ]);

    trigger('routeAnimation', [
        transition(':enter', [
            style({
                position: 'absolute'
            }),
            animate('0.5s ease-in-out')
        ]),
        transition('* => *', [
            query(':leave', style({ transform: 'translateX(0)', position: 'absolute'}), { optional: true }),
            query(':enter', style({ transform: 'translateX(100%)', position: 'absolute'}), { optional: true }),

            group([
                query(':leave', animate('.5s ease-in-out', style({transform: 'translateX(-100%)'})), { optional: true }),
                query(':enter', animate('.5s ease-in-out', style({transform: 'translateX(0)'})), { optional: true })
            ])
        ])
    ]);

    // trigger('routeAnimation', [
    //     transition('* => void', [ // For previous page
    //         style({opacity: 1}),
    //         animate('0.5s ease-in-out', style({opacity: 0}))
    //     ]),
    //     transition('void => *', [
    //         style({opacity: 0}),
    //         animate('0.5s ease-in-out', style({opacity: 1}))
    //     ]) // For next page
    // ])

