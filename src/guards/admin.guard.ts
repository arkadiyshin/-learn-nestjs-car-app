import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { CurrentUser } from '../users/decorators/current-user.decorator';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      if(!request.CurrentUser){
        return false;
      }

      return request.CurrentUser.admin;
  }
}