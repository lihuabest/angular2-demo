import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {LoginService} from "../../services/login.service";
/**
 * Created by Administrator on 2017/5/1.
 */

@Injectable()
export class MainGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginService.isLogin) {
      return true;
    }
  }
}
