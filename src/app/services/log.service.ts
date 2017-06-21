import {Injectable} from "@angular/core";
/**
 * Created by Administrator on 2017/5/18.
 */

@Injectable()
export class LogService {

    isShowLog: boolean = true;

    defaultLevel: number = 0;

    /**
     * 一般类型日志打印
     * @param msg 打印的内容
     * @param order 消息位置
     * @param level 打印级别
     */
    log(msg: any, order: string = 'msg', level: number = 0) {
        this.isShowLog && this.write(msg, 'info', order, level);
    }

    /**
     * 错误类型日志打印
     * @param msg 打印的内容
     * @param order 消息位置
     * @param level 打印级别
     */
    error(msg: any, order: string = 'msg', level: number = 0) {
        this.isShowLog && this.write(msg, 'error', order, level);
    }

    /**
     * 打印 私有方法
     * @param msg 打印的内容
     * @param type console的打印类型
     * @param order 消息位置
     * @param level 打印级别
     */
    private write(msg: any, type: string, order: string, level: number = 0) {
        let prefix = 'IM:' + order + ':';

        if (level === this.defaultLevel) {
            if (typeof msg === 'string') {
                try {
                    console[type](prefix, JSON.parse(msg));
                } catch (e) {
                    console[type](prefix, msg);
                }
            } else {
                console[type](prefix, msg);
            }
        }

    }
}
