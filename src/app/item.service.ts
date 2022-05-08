import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http:HttpClient) { }

  getItemList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'item-list');
  }

  getBillList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'bill-list');
  }

  createItem(item: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'save-item', item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-item/${id}`, { responseType: 'text' });
  }

  getItem(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/item/${id}`);
  }

  updateItem(id: number, value: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/update-item/${id}`, value);
  }
  getBill(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/bill/${id}`);
  }
  
  getStudentList(): Observable<any>{
    return this.http.get(`${this.baseUrl}`+'student-list');
  }
  deleteStudentData(id:number):Observable<Object>{
    return this.http.delete(`${this.baseUrl}/delete-student-data/${id}`,{responseType:'text'});
  }
  
  createStudent(student:object):Observable<object>{
    return this.http.post(`${this.baseUrl}`+'save-student-data',student);
  }

  getStudent(id: number):Observable<Object>{
    return this.http.get(`${this.baseUrl}/student/${id}`);
  }
}                                           