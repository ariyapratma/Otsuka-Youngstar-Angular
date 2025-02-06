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

  createData(data: any): Observable<any> {
    return this.http.post(this.apiUrlLocal + '/todos', data, this.httpOptions);
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTczODgzMjE3OSwiZXhwIjoxNzM4ODM1Nzc5fQ.zDelVUbbicIPszgnn8WCkjw6SSNdrGYguiB3dwD4P88`,
    }),
  };
}
