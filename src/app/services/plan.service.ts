import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Plan } from '../models/plan';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getAll() {
    return this.http.get<Plan[]>(`${environment.apiUrl}plan`, this.httpOptions);
  }

  getById(id: string) {
    return this.http.get<Plan>(`${environment.apiUrl}plan/${id}`, this.httpOptions);
  }

  register(people: Plan) {
    return this.http.post<any>(`${environment.apiUrl}plan`, people, this.httpOptions).pipe(first()).subscribe(success => {
      this.saveSuccess$.next(success);
    },
    error => {
      this.saveError$.next(error);
    });
  }

  update(people: Plan) {
    return this.http.put<any>(`${environment.apiUrl}plan`, people, this.httpOptions).pipe(first()).subscribe(success => {
      this.updateSuccess$.next(success);
    },
    error => {
      this.updateError$.next(error);
    });
  }

  delete(plan: Plan) {
    this.httpOptions.params = new HttpParams().set('id', plan.id.toString());
    return this.http.delete<any>(`${environment.apiUrl}plan`, this.httpOptions).pipe(first()).subscribe(success => {
      this.deleteSuccess$.next(success);
    },
    error => {
      this.deleteError$.next(error);
    });
  }
}
