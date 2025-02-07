import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  apiUrlLocal = 'http://localhost:4912';

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get(this.apiUrlLocal + '/todos', this.httpOptions);
  }
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrlLocal}/todo`, this.httpOptions);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrlLocal}/todos/${id}`,
      this.httpOptions
    );
  }

  createData(data: any): Observable<any> {
    return this.http.post(this.apiUrlLocal + '/todos', data, this.httpOptions);
  }

  updateData(id: string, data: any) {
    return this.http.put(`${this.apiUrlLocal}/todos/${id}`, data);
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTczODg5MjE0OSwiZXhwIjoxNzM4ODk1NzQ5fQ.SQ_Bmoix0MOwoZ9d5KpMLJTMe2JLEgvKoGJO0pK2hiE`,
    }),
  };
}
