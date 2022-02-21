import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private session: SessionService) { }
  
  login(cred:any){
 return this.httpClient.post(environment.host+'/auth/login',cred);
  }
}
