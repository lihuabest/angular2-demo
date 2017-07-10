/**
 * Created by LIHUA on 2017/7/7/007.
 */

export interface CellModelInterface {
    width?: number;
    height?: number;
    spacing?: number;
    left?: number;
    top?: number;
    zIndex?: number;
}

export class CellModel {
    width: number = 300;
    height: number = 350;
    left: number = 10;
    top: number = 10;
    zIndex: number = 10;
    tHeight: number = 30;

    constructor(config?: CellModelInterface) {
        Object.assign(this, config);
    }
}
