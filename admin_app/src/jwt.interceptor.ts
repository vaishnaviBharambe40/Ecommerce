import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, filter, map, Observable, tap } from "rxjs";
import { SessionService } from './app/session.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router, 
    private session: SessionService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer '+this.session.getToken())
        .append('Access-Control-Allow-Origin', '*')
    }); 
    return next.handle(authReq).pipe(tap(() => {},
    (err: any) => {
        if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
                this.session.deleteToken();
                this.router.navigateByUrl("");
            }
        }
    }));
  }
}