import {
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import  { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {

  constructor(private dto: any ) {}
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

    return next.handle().pipe(
      map( (data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      })
    )

  }
}