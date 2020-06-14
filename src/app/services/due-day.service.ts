import { Injectable } from '@angular/core';
import { DueDay } from '../models/due-day';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DueDayService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getAll() {
    return this.http.get<DueDay[]>(`${environment.apiUrl}dueDay`, this.httpOptions);
  }
}
