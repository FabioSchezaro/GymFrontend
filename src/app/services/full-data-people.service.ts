import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FullDataPeople } from '../models/full-data-people';
import { first } from 'rxjs/operators';
import { People } from '../models/people';

@Injectable({
  providedIn: 'root'
})
export class FullDataPeopleService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  GetById(id: string) {
    return this.http.get<FullDataPeople>(`${environment.apiUrl}FullDataPeople/${id}`, this.httpOptions);
  }

  Register(fullDataPeople: FullDataPeople) {
    return this.http.post<boolean>(`${environment.apiUrl}FullDataPeople`, fullDataPeople, this.httpOptions).pipe(first()).subscribe(
    success => {
      this.saveSuccess$.next(success);
    },
    error => {
      this.saveError$.next(error);
    });
  }

  Update(fullDataPeople: FullDataPeople) {
    return this.http.put<boolean>(`${environment.apiUrl}FullDataPeople`, fullDataPeople, this.httpOptions).pipe(first()).subscribe(
    success => {
      this.updateSuccess$.next(success);
    },
    error => {
      this.updateError$.next(error);
    });
  }

  Delete(people: People) {
    this.httpOptions.params = new HttpParams().set('id', people.id.toString());
    return this.http.delete<any>(`${environment.apiUrl}FullDataPeople`, this.httpOptions).pipe(first()).subscribe(success => {
      this.deleteSuccess$.next(success);
    },
    error => {
      this.deleteError$.next(error);
    });
  }
}
