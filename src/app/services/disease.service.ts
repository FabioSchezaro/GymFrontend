import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Disease } from '../models/disease';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getAll() {
    return this.http.get<Disease[]>(`${environment.apiUrl}disease`, this.httpOptions);
  }

  getById(id: string) {
    return this.http.get<Disease>(`${environment.apiUrl}disease/${id}`, this.httpOptions);
  }

  register(disease: Disease) {
    return this.http.post<any>(`${environment.apiUrl}disease`, disease, this.httpOptions).pipe(first()).subscribe(success => {
      this.saveSuccess$.next(success);
    },
    error => {
      this.saveError$.next(error);
    });
  }

  update(disease: Disease) {
    return this.http.put<any>(`${environment.apiUrl}disease`, disease, this.httpOptions).pipe(first()).subscribe(success => {
      this.updateSuccess$.next(success);
    },
    error => {
      this.updateError$.next(error);
    });
  }

  delete(disease: Disease) {
    this.httpOptions.params = new HttpParams().set('id', disease.id.toString());
    return this.http.delete<any>(`${environment.apiUrl}disease`, this.httpOptions).pipe(first()).subscribe(success => {
      this.deleteSuccess$.next(success);
    },
    error => {
      this.deleteError$.next(error);
    });
  }
}
