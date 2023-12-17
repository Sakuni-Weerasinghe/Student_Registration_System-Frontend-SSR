import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private baseUrl:string = "https://localhost:7270/api/Admin";

  constructor(
    private http: HttpClient
  ) { }

  getUsers(){
    return this.http.get<any>(this.baseUrl);
  }
}
