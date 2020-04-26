import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { People } from '../models/people';

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getAll() {
    return this.http.get<People[]>(`${environment.apiUrl}people`, this.httpOptions);
  }

  getById(id: string) {
    return this.http.get<People>(`${environment.apiUrl}people/${id}`, this.httpOptions);
  }

  register(people: People) {
    return this.http.post(`${environment.apiUrl}people/register`, people, this.httpOptions);
  }

  update(people: People) {
    return this.http.put(`${environment.apiUrl}people`, people, this.httpOptions);
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}people/${id}`, this.httpOptions);
  }
}
