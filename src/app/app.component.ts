import {Component, NgZone} from '@angular/core';
import {routeAnimation} from "./animations";
import {Router, NavigationEnd} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [routeAnimation]
})
export class AppComponent {
    // router跳转动画所需参数
    routerState: boolean = true;
    routerStateCode: string = 'active';


    // media query
    private SMALL_WIDTH_BREAKPOINT = 840;
    private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${this.SMALL_WIDTH_BREAKPOINT}px)`);
    private isSmall = this.mediaMatcher.matches;

    constructor(private router: Router,
                private zone: NgZone) {
        // this.router.events.subscribe(event => {
        //     if (event instanceof NavigationEnd) {
        //         // 每次路由跳转改变状态
        //         this.routerState = !this.routerState;
        //         this.routerStateCode = this.routerState ? 'active' : 'inactive';
        //     }
        // });
        
        this.mediaMatcher.addListener(mql => {
            this.isScreenSmall();
            zone.run(() => this.mediaMatcher = mql)
        });
    }

    isScreenSmall(): boolean {
        this.isSmall = this.mediaMatcher.matches;
        return this.mediaMatcher.matches;
    }


    getState(outlet) {
        return outlet.activatedRouteData.state;
    }
}
