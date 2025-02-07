import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private apiUrlLocal = 'http://localhost:4912';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTczODkxMzk2MiwiZXhwIjoxNzQ3NTUzOTYyfQ.pqy0zTypwbNIISaxaTbMmLEtqUIfJerSoRQg2PcRsCU`,
    }),
  };

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrlLocal}/todos`, this.httpOptions);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrlLocal}/todos/${id}`, this.httpOptions);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrlLocal}/todo`, this.httpOptions);
  }

  createData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrlLocal}/todos`, data, this.httpOptions);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(
      `${this.apiUrlLocal}/todos/${id}`,
      data,
      this.httpOptions
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrlLocal}/todos/${id}`,
      this.httpOptions
    );
  }
}
