import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _httpClient: HttpClient) { }

  getToken(){
    const valueOfToken:any = localStorage.getItem('token');
    let headers = new HttpHeaders().set('authentication', valueOfToken);
    return headers;
  }

  get(url: string) {
    const headers = this.getToken();
    return this._httpClient.get(`${environment.apiURL}/${url}`,{ headers: headers});
  }

  getByID(url: string, body: number) {
    const headers = this.getToken();
    return this._httpClient.get(`${environment.apiURL}/${url}/${body}`,{ headers: headers});
  }

  post(url: string, body: any) {
    const headers = this.getToken();
    return this._httpClient.post(`${environment.apiURL}/${url}`, body,{ headers: headers});
  }

  delete(url: string, body: any) {
    const headers = this.getToken();
    return this._httpClient.delete(`${environment.apiURL}/${url}/${body}`,{ headers: headers});
  }

  put(url: string, id: number, body: any) {
    const headers = this.getToken();
    return this._httpClient.put(`${environment.apiURL}/${url}/${id}`, body,{ headers: headers});
  }

  login(url: string, body: any) {
    return this._httpClient.post(`${environment.apiURL}/${url}`, body);
  }

  search(url: string, sort: number, word: string) {
    return this._httpClient.get(`${environment.apiURL}/${url}/search/?Ssort=${sort}&Sword=${word}`);
  }

  getPart(url: string, skip: number) {
    return this._httpClient.get(`${environment.apiURL}/${url}/part/${skip}`);
  }
  
  getCount(url: string) {
    return this._httpClient.get(`${environment.apiURL}/${url}/count`);
  }

}

