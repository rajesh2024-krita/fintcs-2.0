
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Society, CreateSocietyRequest } from '../../shared/models/society.model';

@Injectable({
  providedIn: 'root'
})
export class SocietyService {
  private readonly apiUrl = 'http://localhost:5000/api/societies';

  constructor(private http: HttpClient) {}

  getSocieties(): Observable<Society[]> {
    return this.http.get<Society[]>(this.apiUrl);
  }

  getSociety(id: string): Observable<Society> {
    return this.http.get<Society>(`${this.apiUrl}/${id}`);
  }

  createSociety(society: CreateSocietyRequest): Observable<Society> {
    return this.http.post<Society>(this.apiUrl, society);
  }

  updateSociety(id: string, society: CreateSocietyRequest): Observable<Society> {
    return this.http.put<Society>(`${this.apiUrl}/${id}`, society);
  }

  deleteSociety(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
