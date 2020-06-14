import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { first } from 'rxjs/operators';
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

  GetActivePeopleByName(name: string) {
    this.httpOptions.params = new HttpParams().set('name', name.toString());
    return this.http.get<People[]>(`${environment.apiUrl}people/active`, this.httpOptions);
  }

  getById(id: string) {
    return this.http.get<People>(`${environment.apiUrl}people/${id}`, this.httpOptions);
  }

  register(people: People) {
    return this.http.post<any>(`${environment.apiUrl}people`, people, this.httpOptions).pipe(first()).subscribe(success => {
      this.saveSuccess$.next(success);
    },
    error => {
      this.saveError$.next(error);
    });
  }

  update(people: People) {
    return this.http.put<any>(`${environment.apiUrl}people`, people, this.httpOptions).pipe(first()).subscribe(success => {
      this.updateSuccess$.next(success);
    },
    error => {
      this.updateError$.next(error);
    });
  }

  delete(people: People) {
    this.httpOptions.params = new HttpParams().set('id', people.id.toString());
    return this.http.delete<any>(`${environment.apiUrl}people`, this.httpOptions).pipe(first()).subscribe(success => {
      this.deleteSuccess$.next(success);
    },
    error => {
      this.deleteError$.next(error);
    });
  }
}
