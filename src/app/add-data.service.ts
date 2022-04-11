import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddDataService {

  constructor(private http:HttpClient) { }

  addData(data:any):Observable<any>{
    return this.http.post('http://localhost:3000/users/signup',data)
  }

  faceDcan(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/users/login',data)
   }
}
